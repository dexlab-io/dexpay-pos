import React from 'react';
import styled from 'styled-components';

import PaymentItem from './PaymentItem';
import xDAIHDWallet from '../../../../class/xdai/xDAIHDWallet';
import { store } from '../../../../store';

const Container = styled.div`
  overflow-y: scroll;
  max-height: 620px;
  padding-right: 20px;
`;

const LeftSide = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 1.5rem;
  border-left: ${props => `1px solid ${props.theme.borderColor}`};
  @media only screen and (max-width: ${props => props.theme.mobileBreakpoint}) {
    padding: 0;
  }
`;

class RecentPayments extends React.Component {
  state = {
    type: "transactions",
    transactions: [],
    isLoading: true
  };

  componentDidMount() {
    store.fetch.pos().subscribe(async result => {
      // eslint-disable-next-line new-cap
      this.wallet = new xDAIHDWallet(null, result.data.pos.address);
      await this.wallet.setWeb3();
      await this.wallet.fetchEthTransactions();
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        transactions: this.wallet.transactions,
        isLoading: false
      });
    });
    if(this.props.type) {
      this.setState({ type: this.props.type });
    }
  }

  render() {
    const { transactions, isLoading } = this.state;
    return (
      <Container>
        {isLoading && <p>Loading recent {this.state.type}.</p>}
        {transactions.length === 0 && !isLoading && (
          <p>No recent {this.state.type} found.</p>
        )}
        {transactions.map(item => (
          <PaymentItem key={item.transactionHash} payment={item} />
        ))}
      </Container>
    );
  }
}

export default RecentPayments;
