import React from 'react';
import styled from 'styled-components';
import PaymentDetails from './components/PaymentDetails';

const Container = styled.div`
  margin: 0 auto;
  position: relative;
  padding: 0 2rem;
`;

export default function() {
  const { status } = this;

  return (
    <section>
      <Container>
        <PaymentDetails
          status={status}
          addTipPayment={this.addTipPayment}
          {...this.state}
        />
      </Container>
    </section>
  );
}
