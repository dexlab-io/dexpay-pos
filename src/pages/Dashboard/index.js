import React, { Component, Fragment } from 'react';
import { withRouter, matchPath } from 'react-router-dom';
import Confetti from 'react-confetti';

import { checkWindowSize } from '../../utils/helpers';
import { store } from '../../store';
import MobileView from './mobile.view';
import DesktopView from './desktop.view';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Payment from '../Payment';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: checkWindowSize(),
      activeTab: this.getActiveTab(),
      lastTab: 'numberPad',
      totalAmount: '0',
      paymentModalOpen: false,
      setupModalOpen: false,
      pos: { address: null },
      tipHashes: [],
      confettiRun: false,
      confettiRec: false,
    };
  }

  getActiveTab() {
    const match = matchPath(window.location.pathname, {
      path: '/address/:id/:activeTab'
    });
    if(match && match.params.activeTab === 'tip') {
      return 'tip';
    }
    else return 'numberPad';
  }

  componentDidMount() {
    // on screen resize
    checkWindowSize(false, isMobile => {
      this.setState({ isMobile });
    });

    store.fetch.posSub(this, 'pos');
  }

  handlePay = () => {
    this.setState({ paymentModalOpen: true });
  };

  onClosePaymentModal = () => {
    this.setState({
      paymentModalOpen: false
    });
  };

  onPaymentReceived = () => {
    setTimeout(() => {
      this.onClosePaymentModal();
      this.setState({
        totalAmount: '0'
      });
      this.productItems.resetItems();
    }, 5000);
  };

  confetti = () => {
    this.setState({
      confettiRun: true,
      confettiRec: true,
    });
    window.setTimeout(() => {
      this.setState({ confettiRec: false });
    }, 5000);
  }

  onTipReceived = (txHash) => {
    const { tipHashes } = this.state;
    tipHashes.push(txHash);
    this.setState({ tipHashes });
    this.confetti();
  }

  handleNavItemChange = activeTab => {
    // eslint-disable-next-line
    const currentTab = this.state.activeTab;
    const nextTab = activeTab;
    if (
      (currentTab === 'productItems' && nextTab === 'numberPad') ||
      (currentTab === 'numberPad' && nextTab === 'productItems')
    ) {
      this.setState({ totalAmount: '0' });
    }
    this.setState({ activeTab, lastTab: currentTab });
  };

  onCloseTip = () => {
    this.handleNavItemChange(this.state.lastTab);
  };

  render() {
    const { isMobile, totalAmount, paymentModalOpen, activeTab } = this.state;

    return (
      <Fragment>
      <Layout
        header={{ onNavItemClick: this.handleNavItemChange }}
        activeNavItem={activeTab}
      >
        <Seo title="POS" description="POS System" />
        {isMobile
          ? MobileView.call(this, this.props, this.state)
          : DesktopView.call(this, this.props, this.state)}
        {paymentModalOpen ? (
          <Payment
            onPaymentReceived={this.onPaymentReceived}
            isModalOpen={paymentModalOpen}
            onCloseModal={this.onClosePaymentModal}
            total={totalAmount}
          />
        ) : null}
      </Layout>
        <Confetti
          style={ { zIndex: -1 } }
          run={this.state.confettiRun}
          recycle={this.state.confettiRec}
          numberOfPieces={600}
        />
      </Fragment>
    );
  }
}

export default withRouter(Dashboard);
