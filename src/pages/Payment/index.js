import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import Modal from 'react-responsive-modal';
import gql from 'graphql-tag';
import { find } from 'lodash';
import swal from 'sweetalert';

import apolloClient from '../../utils/apolloClient';
import WatcherTx from '../../class/WatcherTx';
import { checkWindowSize } from '../../utils/helpers';
import MobileView from './mobile.view';
import DesktopView from './desktop.view';
import Seo from '../../components/Seo';

const query = gql`
  {
    currency @client
    walletAddress @client
    exchangeRates @client {
      token
      fiat {
        currency
        price
      }
    }
  }
`;

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
    txHash: null,
    numConfirmations: 0,
    exchangeRates: [],
    currency: null
  };

  async componentDidMount() {
    // on screen resize
    checkWindowSize(false, isMobile => {
      this.setState({ isMobile });
    });

    apolloClient.watchQuery({ query }).subscribe(async result => {
      // console.log('payment query', result);
      this.setState({
        posAddress: result.data.walletAddress,
        exchangeRates: result.data.exchangeRates,
        currency: result.data.currency
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
    this.watcherXdai = null;
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
    const {
      valueFiat,
      tipValue,
      posAddress,
      exchangeRates,
      currency
    } = this.state;
    const { onPaymentReceived } = this.props;

    const totalIncludingTip = parseFloat(valueFiat) + parseFloat(tipValue);
    const pricesDai = find(exchangeRates, {
      token: 'xdai'
    });
    if (!pricesDai) {
      return swal(
        'Issue!',
        'Unable to fetch fiat prices, please try again',
        'warning'
      );
    }
    const pricesDaiFiat = find(pricesDai.fiat, {
      currency: currency.toLowerCase()
    });

    // const ethValue = (
    //   parseFloat(totalIncludingTip) / parseFloat(pricesEth[config.currency.id])
    // ).toFixed(4);
    const daiValue = (
      parseFloat(totalIncludingTip) / parseFloat(pricesDaiFiat.price)
    ).toFixed(2);

    await this.setState({
      valueCrypto: {
        //   eth: ethValue,
        dai: daiValue
      }
    });

    this.watcherXdai = null;
    this.watcherXdai = new WatcherTx(WatcherTx.NETWORKS.XDAI);
    this.watcherXdai.xdaiTransfer(posAddress, daiValue, data => {
      this.setState({
        txState: data.state,
        txHash: data.txHash,
        numConfirmations: data.numConfirmations
      });

      if (data.state === WatcherTx.STATES.CONFIRMED) {
        this.watcherXdai.pollingOn = false;
        onPaymentReceived({
          txHash: data.txHash,
          assetUsed: 'dai',
          cryptoAmount: parseFloat(daiValue)
        });
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
    this.status = txState;

    if (txState === WatcherTx.STATES.PENDING) {
      this.title = `1 / 3 ${t('Awaiting Payment')}`;
    } else if (txState === WatcherTx.STATES.DETECTED) {
      this.title = `2 / 3 ${t('Pending Payment')}`;
    } else if (txState === WatcherTx.STATES.NEW_CONFIRMATION) {
      this.title = `2 / 3 ${t('Pending Payment')}`;
    } else if (txState === WatcherTx.STATES.CONFIRMED) {
      this.title = `3 / 3 ${t('Payment Successful')}`;
    }

    const { isMobile } = this.state;
    const { isModalOpen, onCloseModal } = this.props;

    return (
      <Modal
        open={isModalOpen}
        onClose={() => {
          if (this.watcherXdai) {
            this.watcherXdai.pollingOn = false;
          }
          this.watcherXdai = null;
          onCloseModal();
        }}
        center
        showCloseIcon={false}
        styles={{
          modal: {
            maxWidth: 'initial',
            width: '414px',
            maxHight: '770px',
            height: 'auto',
            borderRadius: '12px',
            padding: 0
          },
          overlay: { background: 'rgba(0, 0, 0, 0.89)' }
        }}
      >
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
      </Modal>
    );
  }
}

export default withNamespaces()(Payment);
