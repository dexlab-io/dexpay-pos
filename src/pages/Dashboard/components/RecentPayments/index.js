import React from 'react';
import styled from 'styled-components';

import PaymentItem from './PaymentItem';
import xDAIHDWallet from '../../../../class/xdai/xDAIHDWallet';
import { store } from '../../../../store';

const Container = styled.div`
  overflow: scroll;
  max-height: 620px;
`;

class RecentPayments extends React.Component {
  state = {
    transactions: []
  };

  componentDidMount() {
    store.fetch.pos().subscribe(async result => {
      // eslint-disable-next-line new-cap
      this.wallet = new xDAIHDWallet(null, result.data.pos.address);
      this.wallet.setWeb3();
      await this.wallet.fetchEthTransactions();
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        transactions: this.wallet.transactions
      });
    });
  }

  render() {
    const { transactions } = this.state;
    return (
      <Container>
        {transactions.map(item => (
          <PaymentItem key={item.transactionHash} payment={item} />
        ))}
      </Container>
    );
  }
}

export default RecentPayments;
