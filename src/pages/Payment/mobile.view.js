import React from 'react';
import styled from 'styled-components';

import PaymentDetails from './components/PaymentDetails';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 350px;
  margin: 0 auto;
  position: relative;
  padding: 0 1.4rem;
`;

export default function() {
  const { status, title } = this;

  return (
    <section>
      <Container className="container is-fluid">
        <PaymentDetails
          status={status}
          title={title}
          addTipPayment={this.addTipPayment}
          {...this.state}
        />
      </Container>
    </section>
  );
}
