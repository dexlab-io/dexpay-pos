import React from 'react';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import PaymentDetails from './components/PaymentDetails';

export default function() {
  const { title, status } = this;
  const { onCloseModal } = this.props;

  return (
    <Layout
      header={{
        leftIcon: 'back',
        title,
        hideNav: true,
        leftBtnClick: onCloseModal
      }}
    >
      <Seo title={title} description="Payment transaction details." />
      <section className="section">
        <div className="container is-fluid">
          <PaymentDetails
            status={status}
            addTipPayment={this.addTipPayment}
            {...this.state}
          />
        </div>
      </section>
    </Layout>
  );
}
