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
const RightSide = styled.div`
  padding-top: 80px;
`;
const LeftSide = styled.div`
  padding-top: 80px;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 0.75rem;
  border-left: ${props => `1px solid ${props.theme.borderColor}`};

  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default function() {
  const { activeTab, totalAmount } = this.state;

  return (
    <Section className="section">
      <div className="container">
        <div className="columns">
          <RightSide className="column is-two-thirds">
            {activeTab === 'numberPad' && (
              <React.Fragment>
                <Keypad
                  handleChange={val => this.setState({ totalAmount: val })}
                />
              </React.Fragment>
            )}
            {activeTab === 'recentPayments' && <RecentPayments />}
          </RightSide>
          <LeftSide className="column">
            <NumberInput value={parseFloat(totalAmount)} />
            <GenerateBillBtn handlePay={this.handlePay} />
          </LeftSide>
        </div>
      </div>
    </Section>
  );
}
