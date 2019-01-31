import { Component } from 'react';
import PropTypes from 'prop-types';
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
      totalAmount: 0
    };
  }

  componentDidMount() {
    // on screen resize
    checkWindowSize(false, isMobile => {
      this.setState({ isMobile });
    });
  }

  handlePay = () => {
    const { totalAmount } = this.state;
    const { history } = this.props;

    history.push('/payment', { total: totalAmount });
  };

  render() {
    const { isMobile } = this.state;

    return isMobile
      ? MobileView.call(this, this.props, this.state)
      : DesktopView.call(this, this.props, this.state);
  }
}

Dashboard.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(Dashboard);
