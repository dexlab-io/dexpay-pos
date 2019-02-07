import React from 'react';
import { withNamespaces } from 'react-i18next';
import Modal from 'react-responsive-modal';

import WatcherTx from '../../class/WatcherTx';
import { checkWindowSize } from '../../utils/helpers';
import config from '../../config';
import { getTokenPrice } from '../../utils/Coingecko';
import MobileView from './mobile.view';
import DesktopView from './desktop.view';

class Payment extends React.Component {
  state = {
    isMobile: checkWindowSize(),
    valueCrypto: {
      eth: '0',
      dai: '0'
    },
    watchers: null,
    valueFiat: 0,
    tipPercentage: 0,
    tipValue: 0,
    txState: null,
    txHash: null
  };

  async componentDidMount() {
    const { total } = this.props;
    const valueFiat = total;

    // on screen resize
    checkWindowSize(false, isMobile => {
      this.setState({ isMobile });
    });

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

    this.setState({
      watchers: {
        xdai: watcherXdai
      }
    });

    // watcherEth.etherTransfers(config.posAddress, ethValue, data => {
    //   this.setState({
    //     txState: data.state,
    //     txHash: data.txHash
    //   });
    // });
  };

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
        showCloseIcon={false}
        styles={{
          modal: { maxWidth: 'initial', width: '100%' },
          overlay: { padding: 0 }
        }}
      >
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
      </Modal>
    );
  }
}

export default withNamespaces()(Payment);
