import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
      activeTab: 'numberPad',
      totalAmount: '0',
      paymentModalOpen: false,
      setupModalOpen: false,
      pos: { address: null }
    };
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
      paymentModalOpen: false,
      activeTab: 'numberPad',
      totalAmount: '0'
    });
  };

  onPaymentReceived = () => {
    setTimeout(() => {
      this.onClosePaymentModal();
    }, 5000);
  };

  handleNavItemChange = activeTab => {
    this.setState({ activeTab });
  };

  render() {
    const { isMobile, totalAmount, paymentModalOpen } = this.state;
    return (
      <Layout header={{ onNavItemClick: this.handleNavItemChange }}>
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
    );
  }
}

export default withRouter(Dashboard);
