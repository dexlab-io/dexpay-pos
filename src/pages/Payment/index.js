import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import CryptoAmount from './components/CryptoAmount';
import FiatAmount from './components/FiatAmount';
import AddTip from './components/AddTip';
import QrCode from './components/QrCode';
import AddressClipboard from './components/AddressClipboard';
import NetworkStatus from './components/NetworkStatus';
import InProgressBlocks from './components/InProgressBlocks';
import { Divider } from '../../components/elements';
import WatcherTx from '../../class/WatcherTx';
import config from '../../config';
import { getTokenPrice } from '../../utils/Coingecko';

class Payment extends Component {
  state = {
    value: 0,
    valueCrypto: {
      eth: '0',
      dai: '0'
    },
    valueFiat: 0,
    tipPercentage: 0,
    tipValue: 0,
    txState: null,
    txHash: null
  };

  async componentDidMount() {
    const { location } = this.props;
    const valueFiat = location.state.total;

    await this.setState({
      valueFiat,
      txState: WatcherTx.STATES.PENDING
    });

    await this.calculateCryptoValue();
  }

  addTipPayment = async percentage => {
    const { tipPercentage } = this.state;
    if (tipPercentage === percentage) {
      await this.setState({
        tipPercentage: 0,
        tipValue: 0
      });
    } else {
      const valueFiat = parseFloat(this.state.valueFiat);
      const tipValue = (valueFiat / 100) * percentage;
      await this.setState({
        tipPercentage: percentage,
        tipValue
      });
    }
    this.calculateCryptoValue();
  };

  calculateCryptoValue = async () => {
    const { valueFiat, tipValue } = this.state;
    const totalIncludingTip = parseFloat(valueFiat) + parseFloat(tipValue);

    const pricesEth = await getTokenPrice();
    const pricesDai = await getTokenPrice('dai');

    const ethValue = (
      parseFloat(totalIncludingTip) / parseFloat(pricesEth[config.currency.id])
    ).toPrecision(4);
    const daiValue = (
      parseFloat(totalIncludingTip) / parseFloat(pricesDai[config.currency.id])
    ).toPrecision(2);

    await this.setState({
      valueCrypto: {
        eth: ethValue,
        dai: daiValue
      }
    });

    // const watcherEth = new WatcherTx(WatcherTx.NETWORKS.ROPSTEN);
    const watcherXdai = new WatcherTx(WatcherTx.NETWORKS.XDAI);

    watcherXdai.xdaiTransfer(config.posAddress, daiValue, data => {
      this.setState({
        txState: data.state,
        txHash: data.txHash
      });
    });

    // watcherEth.etherTransfers(config.posAddress, ethValue, data => {
    //   this.setState({
    //     txState: data.state,
    //     txHash: data.txHash
    //   });
    // });
  };

  render() {
    const { valueCrypto, valueFiat, txState, txHash, tipValue } = this.state;
    const { t } = this.props;
    const { posAddress } = config;
    let title = '';
    let status = null;
    let statusText = null;

    if (txState === WatcherTx.STATES.PENDING) {
      title = `1 / 3 ${t('Awaiting Payment')}`;
      status = 'pending';
      statusText = `Waiting for payment ${
        valueCrypto.eth ? valueCrypto.eth : 0
      } ETH / ${valueFiat}$ at address ${posAddress}`;
    } else if (txState === WatcherTx.STATES.DETECTED) {
      title = `2 / 3 ${t('Pending Payment')}`;
      status = 'detected';
      statusText = `Payment detected, waiting for confirmation.`;
    } else if (txState === WatcherTx.STATES.CONFIRMED) {
      title = `3 / 3 ${t('Payment Successful')}`;
      status = 'confirmed';
      statusText = `Payment confirmed 🎊.{' '} <a href="https://ropsten.etherscan.io/tx/${txHash}"> Verify tx </a>`;
    }
    // status = 'detected';

    return (
      <Layout header={{ leftIcon: 'back', title }}>
        <Seo title={title} description="Payment transaction details." />
        <section className="section">
          <div className="container is-fluid">
            <CryptoAmount
              cryptoCurrency="ETH"
              cryptoValue={valueCrypto.eth}
              fiatAmount={parseFloat(valueFiat)}
              hasSelection={status !== 'pending'}
            />
            <CryptoAmount
              cryptoCurrency="DAI"
              cryptoValue={valueCrypto.dai}
              fiatAmount={parseFloat(valueFiat)}
              hasSelection={status === 'pending'}
              handleChange={option => console.log('currency changed', option)}
            />
            <FiatAmount fiatAmount={parseFloat(valueFiat) + tipValue} />
            {status !== 'pending' && <Divider isDotted />}
            {status === 'pending' && (
              <AddTip value={0} handleChange={this.addTipPayment} />
            )}
            {status === 'pending' && <QrCode valueCrypto={valueCrypto.eth} />}
            {status !== 'pending' && (
              <InProgressBlocks
                blocksCount={14}
                status={status}
                txHash={txHash}
              />
            )}
            <AddressClipboard address={posAddress} />
            <NetworkStatus status="connected" />
          </div>
        </section>
      </Layout>
    );
  }
}

export default withNamespaces()(Payment);
