import React from 'react';
import styled from 'styled-components';

import NavTabs from './components/NavTabs';
import GenerateBillBtn from './components/GenerateBillBtn';
import NumberInput from './components/Keypad/NumberInput';
import Keypad from './components/Keypad';
import RecentPayments from './components/RecentPayments';
import Tip from './components/Tip';

const Section = styled.div`
  padding: 0.5rem 1.5rem;
`;

export default function() {
  const { activeTab, totalAmount, pos } = this.state;
  // console.log('totalAmount', totalAmount);

  return (
    <Section className="section">
      <div className="container is-fluid">
        <NavTabs
          activeTab={activeTab}
          onChange={tab => this.setState({ activeTab: tab })}
        />
        {pos.address ? (
          <div>
            {activeTab === 'numberPad' && (
              <React.Fragment>
                <NumberInput value={totalAmount} />
                <Keypad
                  value={totalAmount.toString()}
                  handleChange={val => this.setState({ totalAmount: val })}
                />
                <GenerateBillBtn handlePay={this.handlePay} />
              </React.Fragment>
            )}
            {activeTab === 'recentPayments' && <RecentPayments />}
            {activeTab === 'tip' && <Tip onClose={this.onCloseTip} />}
          </div>
        ) : (
          <div>Pos address is empty</div>
        )}
      </div>
    </Section>
  );
}
