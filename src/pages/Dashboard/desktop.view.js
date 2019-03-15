import React from 'react';
import styled from 'styled-components';

import NumberInput from './components/Keypad/NumberInput';
import GenerateBillBtn from './components/GenerateBillBtn';
import Keypad from './components/Keypad';
import RecentPayments from './components/RecentPayments';
import ProductItems from './components/ProductItems';
import SetWalletAddress from './components/SetWalletAddress';

const Section = styled.div`
  grid-area: content;
  padding: 0;
`;
const Container = styled.div`
  height: 100%;
  display: grid;
  border-top: ${props => `1px solid ${props.theme.borderColor}`};
  border-left: ${props => `1px solid ${props.theme.borderColor}`};
  border-right: ${props => `1px solid ${props.theme.borderColor}`};
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
  grid-template-columns: 70% 30%;
`;

const RightSide = styled.div`
  padding-top: 20px;
`;
const LeftSide = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 80px 2rem 4.5rem 2rem;
  border-left: ${props => `1px solid ${props.theme.borderColor}`};
`;
const NumberWrapper = styled.div`
  max-width: 100%;
  margin-top: -30px;
`;

export default function() {
  const { activeTab, totalAmount, pos, paymentModalOpen } = this.state;
  // console.log('this.state', this.state);

  return (
    <Section className="section">
      {pos.address ? (
        <Container className="container whiteBG">
          <React.Fragment>
            <RightSide>
              {activeTab === 'numberPad' && (
                <Keypad
                  value={totalAmount.toString()}
                  handleChange={val => this.setState({ totalAmount: val })}
                />
              )}
              {activeTab === 'recentPayments' && <RecentPayments />}
              {activeTab === 'productItems' && (
                <ProductItems
                  ref={el => {
                    this.productItems = el;
                  }}
                  paymentModalOpen={paymentModalOpen}
                  handleChange={({ cartTotal }) =>
                    this.setState({ totalAmount: cartTotal })
                  }
                />
              )}
            </RightSide>
            <LeftSide>
              <NumberWrapper>
                <NumberInput value={totalAmount} />
              </NumberWrapper>
              <GenerateBillBtn handlePay={this.handlePay} />
            </LeftSide>
          </React.Fragment>
        </Container>
      ) : (
        <div>
          <SetWalletAddress />
        </div>
      )}
    </Section>
  );
}
