import React from 'react';

import PaymentDetails from './components/PaymentDetails';

export default function() {
  const { status } = this;

  return (
    <section className="section">
      <div className="container">
        <PaymentDetails
          status={status}
          addTipPayment={this.addTipPayment}
          {...this.state}
        />
      </div>
    </section>
  );
}
