import React from 'react';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import NavTabs from './components/NavTabs';
import GenerateBillBtn from './components/GenerateBillBtn';
import NumberInput from './components/Keypad/NumberInput';
import Keypad from './components/Keypad';
import RecentPayments from './components/RecentPayments';
import Payment from '../Payment';

export default function() {
  const { activeTab, totalAmount, paymentModalOpen } = this.state;

  return (
    <Layout>
      <Seo title="POS" description="POS System" />
      <section className="section">
        <div className="container is-fluid">
          <NavTabs
            activeTab={activeTab}
            onChange={tab => this.setState({ activeTab: tab })}
          />
          {activeTab === 'numberPad' && (
            <React.Fragment>
              <NumberInput value={parseFloat(totalAmount)} />
              <Keypad
                handleChange={val => this.setState({ totalAmount: val })}
              />
              <GenerateBillBtn handlePay={this.handlePay} />
            </React.Fragment>
          )}
          {activeTab === 'recentPayments' && <RecentPayments />}
        </div>
      </section>
      <Payment
        isModalOpen={paymentModalOpen}
        onCloseModal={this.onClosePaymentModal}
        total={totalAmount}
      />
    </Layout>
  );
}
