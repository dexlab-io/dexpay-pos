import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import Modal from 'react-responsive-modal';
import gql from 'graphql-tag';
import { find, first } from 'lodash';
import swal from 'sweetalert';
import { WatcherTx } from 'eth-core-js';

import { isNull } from 'util';
import apolloClient from '../../utils/apolloClient';
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

const confirmationsQuery = gql`
  {
    requiredConfirmations @client {
      token
      confirmations
    }
  }
`;

const watchInvoiceMutation = gql`
  mutation watchInvoice(
    $invoiceId: String!
    $cryptoAmount: Float!
    $confirmations: Int!
    $posAddress: String!
  ) {
    watchInvoice(
      input: {
        invoiceId: $invoiceId
        cryptoAmount: $cryptoAmount
        confirmations: $confirmations
        posAddress: $posAddress
      }
    )
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
    currency: null,
    confirmations: []
  };

  async componentDidMount() {
    // on screen resize
    checkWindowSize(false, isMobile => {
      this.setState({ isMobile });
    });

    apolloClient.watchQuery({ query }).subscribe(async result => {
      this.setState({
        posAddress: result.data.walletAddress,
        exchangeRates: result.data.exchangeRates,
        currency: result.data.currency
      });
      await this.updateFiatValue();
    });
  }

  componentDidUpdate(prevProps) {
    const { total, invoiceId } = this.props;

    if (total !== prevProps.total) {
      this.updateFiatValue();
    }

    if (!isNull(invoiceId)) {
      this.watchInvoiceOnApi();
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

    const result = await apolloClient.query({
      query: confirmationsQuery
    });
    const confirmations = result.data.requiredConfirmations;

    // console.log('transaction', confirmations, posAddress, daiValue);
    this.watcherXdai = null;
    const watchTx = new WatcherTx();
    this.watcherXdai = new WatcherTx(watchTx.NETWORKS.XDAI, confirmations);
    this.watcherXdai.xdaiTransfer(posAddress, daiValue, data => {
      this.setState({
        txState: data.state,
        txHash: data.txHash,
        numConfirmations: data.numConfirmations
      });

      if (data.state === watchTx.STATES.CONFIRMED) {
        if (this.watcherXdai) {
          this.watcherXdai.pollingOn = false;
        }
        onPaymentReceived({
          txHash: data.txHash,
          assetUsed: 'dai',
          cryptoAmount: parseFloat(daiValue)
        });
      }
    });

    await this.setState({
      watchers: {
        xdai: this.watcherXdai
      },
      confirmations
    });

    this.watchInvoiceOnApi();
  };

  watchInvoiceOnApi() {
    const { invoiceId } = this.props;
    const { confirmations, posAddress, valueCrypto } = this.state;

    if (!isNull(invoiceId)) {
      // call watcher on server side also
      apolloClient.mutate({
        mutation: watchInvoiceMutation,
        variables: {
          invoiceId,
          confirmations: confirmations ? first(confirmations).confirmations : 5,
          posAddress,
          cryptoAmount: parseFloat(valueCrypto.dai)
        }
      });
    }
  }

  async updateFiatValue() {
    const { total } = this.props;
    const valueFiat = total;
    const watchTx = new WatcherTx();

    await this.setState({
      valueFiat,
      txState: watchTx.STATES.PENDING
    });
    await this.calculateCryptoValue();
  }

  render() {
    const { txState } = this.state;
    const { t } = this.props;
    this.title = '';
    this.status = txState;

    const watchTx = new WatcherTx();

    if (txState === watchTx.STATES.PENDING) {
      this.title = `1 / 3 ${t('Awaiting Payment')}`;
    } else if (txState === watchTx.STATES.DETECTED) {
      this.title = `2 / 3 ${t('Pending Payment')}`;
    } else if (txState === watchTx.STATES.NEW_CONFIRMATION) {
      this.title = `2 / 3 ${t('Pending Payment')}`;
    } else if (txState === watchTx.STATES.CONFIRMED) {
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
