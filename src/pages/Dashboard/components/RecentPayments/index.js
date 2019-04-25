import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import PaymentItem from './PaymentItem';
import PaymentItemWeb3 from './PaymentItemWeb3';
import xDAIHDWallet from '../../../../class/xdai/xDAIHDWallet';
import apolloClient from '../../../../utils/apolloClient';

const query = gql`
  {
    invoices {
      id
      invoiceNumber
      txHash
      fiatAmount
      fiatCurrency
      cryptoAmount
      processedType
      status
      createdAt
      store {
        name
        walletAddress
      }
    }
  }
`;

const Container = styled.div`
  overflow-y: scroll;
  max-height: 620px;
  padding-right: 20px;
`;

class RecentPayments extends React.Component {
  constructor(props) {
    super(props);

    const token = window.localStorage.getItem('token');
    this.state = {
      isLoggedIn: !!token,
      web3Transactions: []
    };
  }

  componentDidMount() {
    const { isLoggedIn } = this.state;

    if (!isLoggedIn) {
      apolloClient.watchQuery({ query }).subscribe(async result => {
        // eslint-disable-next-line new-cap
        this.wallet = new xDAIHDWallet(null, result.data.walletAddress);
        await this.wallet.setWeb3();
        await this.wallet.fetchEthTransactions();
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          web3Transactions: this.wallet.transactions,
          isLoading: false
        });
      });
    }
  }

  render() {
    const { isLoading, isLoggedIn, web3Transactions } = this.state;

    return (
      <Container>
        {!isLoggedIn ? (
          <React.Fragment>
            {web3Transactions.length === 0 && !isLoading && (
              <p>No recent transactions found.</p>
            )}
            {web3Transactions.map(item => (
              <PaymentItemWeb3 key={item.transactionHash} payment={item} />
            ))}
          </React.Fragment>
        ) : (
          <Query query={query} fetchPolicy="cache-and-network">
            {({ data, loading, error }) => {
              // console.log('data', data);
              if (loading && !data.invoices) {
                return (
                  <p style={{ marginLeft: '10px' }}>
                    Loading recent transactions.
                  </p>
                );
              }
              if (error) return <p>Error: {error.message}</p>;
              // console.log('invoices', data.invoices);

              if (data.invoices.length === 0 && !isLoading) {
                return <p>No recent transactions found.</p>;
              }

              return data.invoices.map(item => (
                <PaymentItem key={item.id} payment={item} />
              ));
            }}
          </Query>
        )}
      </Container>
    );
  }
}

export default RecentPayments;
