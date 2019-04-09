import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import PaymentItem from './PaymentItem';

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
      isLoggedIn: !!token
    };
  }

  render() {
    const { isLoading, isLoggedIn } = this.state;

    return (
      <Container>
        {!isLoggedIn ? (
          <p style={{ marginLeft: '10px' }}>Please login to continue.</p>
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
