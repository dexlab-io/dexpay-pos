import React from 'react';
import styled from 'styled-components';

import NavTabs from './components/NavTabs';
import GenerateBillBtn from './components/GenerateBillBtn';
import NumberInput from './components/Keypad/NumberInput';
import Keypad from './components/Keypad';
import RecentPayments from './components/RecentPayments';
import SetWalletAddress from './components/SetWalletAddress';

const Section = styled.div`
  padding: 0.5rem 1.5rem;
`;

export default function() {
  const { activeTab, totalAmount, pos, isLoggedIn } = this.state;

  return (
    <Section className="section">
      {pos.address ? (
        <div className="container whiteBG is-fluid">
          <NavTabs
            activeTab={activeTab}
            onChange={tab => this.setState({ activeTab: tab })}
          />
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
        </div>
      ) : (
        <SetWalletAddress isLoggedIn={isLoggedIn} />
      )}
    </Section>
  );
}
