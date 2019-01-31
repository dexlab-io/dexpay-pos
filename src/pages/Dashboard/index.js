import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Trans } from 'react-i18next';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Keypad from './components/Keypad';
import RecentPayments from './components/RecentPayments';

class Dashboard extends Component {
  state = { activeTab: 'numberPad', totalAmount: 0 };

  handlePay = () => {
    const { totalAmount } = this.state;
    const { history } = this.props;

    history.push('/payment', { total: totalAmount });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <Layout>
        <Seo title="POS" description="POS System" />
        <section className="section">
          <div className="container is-fluid">
            <div className="tabs ">
              <ul>
                <li
                  className={
                    activeTab === 'numberPad'
                      ? 'is-active has-text-weight-semibold'
                      : ''
                  }
                >
                  <a onClick={() => this.setState({ activeTab: 'numberPad' })}>
                    <Trans>Numberpad</Trans>
                  </a>
                </li>
                <li
                  className={
                    activeTab === 'recentPayments'
                      ? 'is-active has-text-weight-semibold'
                      : ''
                  }
                >
                  <a
                    onClick={() =>
                      this.setState({ activeTab: 'recentPayments' })
                    }
                  >
                    <Trans>Recent Payments</Trans>
                  </a>
                </li>
              </ul>
            </div>
            {activeTab === 'numberPad' && (
              <React.Fragment>
                <Keypad
                  handleChange={val => this.setState({ totalAmount: val })}
                />
                <button
                  type="submit"
                  className="button is-black is-uppercase is-large is-fullwidth"
                  onClick={this.handlePay}
                >
                  <Trans>Generate bill</Trans>
                </button>
              </React.Fragment>
            )}
            {activeTab === 'recentPayments' && <RecentPayments />}
          </div>
        </section>
      </Layout>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(Dashboard);
