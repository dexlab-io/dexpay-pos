import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { checkWindowSize } from '../../utils/helpers';
import MobileView from './mobile.view';
import DesktopView from './desktop.view';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: checkWindowSize(),
      activeTab: 'numberPad',
      totalAmount: 0,
      paymentModalOpen: false
    };
  }

  componentDidMount() {
    // on screen resize
    checkWindowSize(false, isMobile => {
      this.setState({ isMobile });
    });
  }

  handlePay = () => {
    this.setState({ paymentModalOpen: true });
  };

  onClosePaymentModal = () => {
    this.setState({ paymentModalOpen: false });
  };

  render() {
    const { isMobile } = this.state;

    return isMobile
      ? MobileView.call(this, this.props, this.state)
      : DesktopView.call(this, this.props, this.state);
  }
}

export default withRouter(Dashboard);
