import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { xDAIHDWallet } from 'eth-dexcore-js';

import PaymentItem from './PaymentItem';
import PaymentItemWeb3 from './PaymentItemWeb3';
import { Message, Loading } from '../../../../components/elements';
import apolloClient from '../../../../utils/apolloClient';

const queryLocal = gql`
  {
    walletAddress @client
  }
`;

const query = gql`
  {
    currency @client
    invoices(where: { status: [paid] }) {
      id
      invoiceNumber
      txHash
      fiatAmount
      fiatCurrency
      cryptoAmount
      assetUsed
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
      apolloClient.watchQuery({ query: queryLocal }).subscribe(async result => {
        // eslint-disable-next-line new-cap
        this.wallet = new xDAIHDWallet(null, result.data.walletAddress);
        await this.wallet.setWeb3();
        await this.wallet.fetchEthTransactions();
        this.setState({
          web3Transactions: this.wallet.transactions
        });
      });
    }
  }

  render() {
    const { isLoading, isLoggedIn, web3Transactions } = this.state;
    const { onOpenModal } = this.props;
    return (
      <Container>
        {!isLoggedIn ? (
          <React.Fragment>
            {web3Transactions.length === 0 && !isLoading && (
              <Message>No recent transactions found.</Message>
            )}
            {web3Transactions.map(item => (
              <PaymentItemWeb3 key={item.transactionHash} payment={item} />
            ))}
          </React.Fragment>
        ) : (
          <Query query={query} fetchPolicy="cache-and-network">
            {({ data, loading, error }) => {
              if (loading && !data.invoices) {
                return <Loading />;
              }
              if (error) return <Message type="error">{error.message}</Message>;
              console.log('invoices', data.invoices);

              if (data.invoices.length === 0 && !isLoading) {
                return <Message>No recent transactions found.</Message>;
              }

              return data.invoices.map(item => (
                <PaymentItem
                  onOpenModal={onOpenModal}
                  key={item.id}
                  payment={item}
                  currency={data.currency}
                />
              ));
            }}
          </Query>
        )}
      </Container>
    );
  }
}

export default RecentPayments;
