import React from 'react';
import PaymentDetails from './components/PaymentDetails';

export default function() {
  const { status, title } = this;

  return (
    <section>
      <PaymentDetails
        status={status}
        title={title}
        addTipPayment={this.addTipPayment}
        changeCurrency={this.changeCurrency}
        {...this.state}
      />
    </section>
  );
}
