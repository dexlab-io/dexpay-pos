import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import Modal from 'react-responsive-modal';

import WatcherTx from '../../class/WatcherTx';
import { checkWindowSize } from '../../utils/helpers';
import config from '../../config';
import { getTokenPrice } from '../../utils/Coingecko';
import MobileView from './mobile.view';
import DesktopView from './desktop.view';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { store } from '../../store';

class Payment extends Component {
  state = {
    isMobile: checkWindowSize(),
    valueCrypto: {
      eth: '0',
      dai: '0'
    },
    posAddress: null,
    watchers: null,
    valueFiat: 0,
    tipPercentage: 0,
    tipValue: 0,
    txState: null,
    txHash: null
  };

  async componentDidMount() {
    // on screen resize
    checkWindowSize(false, isMobile => {
      this.setState({ isMobile });
    });

    store.fetch.pos().subscribe(async result => {
      this.setState({
        posAddress: result.data.pos.address
      });
      await this.updateFiatValue();
    });
  }

  componentDidUpdate(prevProps) {
    const { total } = this.props;
    if (total !== prevProps.total) {
      this.updateFiatValue();
    }
  }

  componentWillUnmount() {
    if (this.watcherXdai) {
      this.watcherXdai.pollingOn = false;
    }
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
    const { valueFiat, tipValue, posAddress } = this.state;
    const { onPaymentReceived } = this.props;
    const totalIncludingTip = parseFloat(valueFiat) + parseFloat(tipValue);
    const pricesEth = await getTokenPrice();
    const pricesDai = await getTokenPrice('dai');

    const ethValue = (
      parseFloat(totalIncludingTip) / parseFloat(pricesEth[config.currency.id])
    ).toFixed(4);
    const daiValue = (
      parseFloat(totalIncludingTip) / parseFloat(pricesDai[config.currency.id])
    ).toFixed(2);

    await this.setState({
      valueCrypto: {
        eth: ethValue,
        dai: daiValue
      }
    });

    this.watcherXdai = new WatcherTx(WatcherTx.NETWORKS.XDAI);
    this.watcherXdai.xdaiTransfer(posAddress, daiValue, data => {
      this.setState({
        txState: data.state,
        txHash: data.txHash
      });

      if (data.state === WatcherTx.STATES.CONFIRMED) {
        this.watcherXdai.pollingOn = false;
        onPaymentReceived();
      }
    });

    this.setState({
      watchers: {
        xdai: this.watcherXdai
      }
    });
  };

  async updateFiatValue() {
    const { total } = this.props;
    const valueFiat = total;
    await this.setState({
      valueFiat,
      txState: WatcherTx.STATES.PENDING
    });
    await this.calculateCryptoValue();
  }

  render() {
    const { txState } = this.state;
    const { t } = this.props;
    this.title = '';
    this.status = null;

    if (txState === WatcherTx.STATES.PENDING) {
      this.title = `1 / 3 ${t('Awaiting Payment')}`;
      this.status = 'pending';
    } else if (txState === WatcherTx.STATES.DETECTED) {
      this.title = `2 / 3 ${t('Pending Payment')}`;
      this.status = 'detected';
    } else if (txState === WatcherTx.STATES.CONFIRMED) {
      this.title = `3 / 3 ${t('Payment Successful')}`;
      this.status = 'confirmed';
    }
    // status = 'detected';

    const { isMobile } = this.state;
    const { isModalOpen, onCloseModal } = this.props;

    return (
      <Modal
        open={isModalOpen}
        onClose={onCloseModal}
        center
        styles={{
          modal: { maxWidth: 'initial', width: '100%', height: '100%' },
          overlay: { padding: 0 }
        }}
      >
        <Layout header={{ isVisible: false }}>
          <Seo title={this.title} description="Payment transaction details." />
          {isMobile
            ? MobileView.call(
                this,
                this.props,
                this.state,
                this.title,
                this.status
              )
            : DesktopView.call(
                this,
                this.props,
                this.state,
                this.title,
                this.status
              )}
        </Layout>
      </Modal>
    );
  }
}

export default withNamespaces()(Payment);
