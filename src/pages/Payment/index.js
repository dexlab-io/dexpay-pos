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
    valueFiat: 0,
    tipPercentage: 0,
    tipValue: 0,
    txState: null,
    txHash: null
  };

  async componentDidMount() {
    const { location } = this.props;
    const valueFiat = location.state.total;
    // console.log('valueFiat', valueFiat);

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
      console.log('tipValue', tipValue);
      await this.setState({
        tipPercentage: percentage,
        tipValue
      });
    }
    this.calculateCryptoValue();
  };

  calculateCryptoValue = async () => {
    const { valueFiat } = this.state;

    const prices = await getTokenPrice();
    const valueCrypto = parseFloat(valueFiat) / parseFloat(prices.usd);
    await this.setState({
      value: valueCrypto
    });

    const watcher = new WatcherTx();
    watcher.etherTransfers(config.posAddress, valueCrypto, data => {
      this.setState({
        txState: data.state,
        txHash: data.txHash
      });
    });
  };

  render() {
    const { value, valueFiat, txState, txHash, tipValue } = this.state;
    const { t } = this.props;
    const { posAddress } = config;
    let title = '';
    let status = null;
    let statusText = null;

    if (txState === WatcherTx.STATES.PENDING) {
      title = `1 / 3 ${t('Awaiting Payment')}`;
      status = 'pending';
      statusText = `Waiting for payment ${
        value ? value.toPrecision(2) : 0
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
    console.log('status', statusText);

    return (
      <Layout header={{ leftIcon: 'back', title }}>
        <Seo title={title} description="Payment transaction details." />
        <section className="section">
          <div className="container is-fluid">
            <CryptoAmount
              cryptoCurrency="DAI"
              cryptoValue={value}
              fiatAmount={parseFloat(valueFiat)}
              hasSelection={status !== 'pending'}
            />
            <FiatAmount fiatAmount={parseFloat(valueFiat) + tipValue} />
            {status !== 'pending' && <Divider isDotted />}
            {status === 'pending' && (
              <AddTip value={0} handleChange={this.addTipPayment} />
            )}
            {status === 'pending' && <QrCode valueCrypto={value} />}
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
