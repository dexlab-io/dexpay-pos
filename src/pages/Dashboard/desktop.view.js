import React from 'react';
import styled from 'styled-components';

import NumberInput from './components/Keypad/NumberInput';
import GenerateBillBtn from './components/GenerateBillBtn';
import Keypad from './components/Keypad';
import RecentPayments from './components/RecentPayments';

const Section = styled.div`
  border-top: ${props => `1px solid ${props.theme.borderColor}`};
  padding-top: 9px;
`;
const Columns = styled.div`
  min-height: 500px;
`;
const RightSide = styled.div`
  padding-top: 20px;
`;
const LeftSide = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 80px 2rem 0.75rem 2rem;
  border-left: ${props => `1px solid ${props.theme.borderColor}`};
`;
const NumberWrapper = styled.div`
  max-width: 100%;
  margin-top: -30px;
`;

export default function() {
  const { activeTab, totalAmount, pos } = this.state;

  return (
    <Section className="section">
      <div className="container">
        <Columns className="columns">
          {pos.address ? (
            <React.Fragment>
              <RightSide className="column is-two-thirds">
                {activeTab === 'numberPad' && (
                  <React.Fragment>
                    <Keypad
                      value={totalAmount.toString()}
                      handleChange={val => this.setState({ totalAmount: val })}
                    />
                  </React.Fragment>
                )}
                {activeTab === 'recentPayments' && <RecentPayments />}
              </RightSide>
              <LeftSide className="column is-one-third">
                <NumberWrapper>
                  <NumberInput value={totalAmount} />
                </NumberWrapper>
                <GenerateBillBtn handlePay={this.handlePay} />
              </LeftSide>
            </React.Fragment>
          ) : (
            <div>{pos.error}</div>
          )}
        </Columns>
      </div>
    </Section>
  );
}
