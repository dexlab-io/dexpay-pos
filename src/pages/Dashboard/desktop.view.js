import React from 'react';
import { Trans } from 'react-i18next';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Keypad from './components/Keypad';
import RecentPayments from './components/RecentPayments';

export default function() {
  const { activeTab } = this.state;

  return (
    <Layout>
      <Seo title="POS" description="POS System" />
      <section className="section">
        <div className="container is-fluid">
          <h1>Desktop!</h1>
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
                  onClick={() => this.setState({ activeTab: 'recentPayments' })}
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
