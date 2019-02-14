import React from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import apolloClient from '../../utils/apolloClient';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';

const query = gql`
  {
    currency @client
  }
`;

const mutation = gql`
  mutation updateCurrency($currency: String!) {
    updateCurrency(currency: $currency) @client
  }
`;

const ItemContainer = styled.div`
  padding: 20px;
  text-align: center;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
  cursor: pointer;
  background-color: ${props => (props.active ? '#000' : '#fff')};
  > span {
    color: ${props => (props.active ? '#fff' : '#000')};
  }
`;

const currencies = [
  { id: 'EUR', name: 'Euro', symbol: '€' },
  { id: 'USD', name: 'United States Dollar', symbol: 'US$' },
  { id: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { id: 'GBP', name: 'Pound sterling', symbol: '£' },
  { id: 'AUD', name: 'Australian dollar', symbol: 'A$' },
  { id: 'CAD', name: 'Canadian dollar', symbol: 'C$' },
  { id: 'CHF', name: 'Swiss franc', symbol: 'Fr' },
  { id: 'CNY', name: 'Renminbi', symbol: '元' }
];

class BaseCurrency extends React.Component {
  state = { activeCurrency: 'EUR' };

  handleCurrencyChange = currency => {
    // this.setState({ activeCurrency: currency.id });
    apolloClient.mutate({ mutation, variables: { currency: currency.id } });
  };

  render() {
    const { history } = this.props;
    const { activeCurrency } = this.state;

    return (
      <Layout header={{ isVisible: false }}>
        <Seo title="Base Currency" />
        <div className="section">
          <div className="container">
            <SettingsHeader history={history} />
            <Breadcrumb
              history={history}
              title="Base Currency"
              icon="currency-icon.png"
            />

            <Query query={query} fetchPolicy="cache-and-network">
              {({ data, loading, error }) => {
                if (loading && !data.currency) return <p>loading...</p>;
                if (error) return <p>Error: {error.message}</p>;
                // console.log('data.currency', data);

                return currencies.map(item => (
                  <ItemContainer
                    key={item.id}
                    active={data.currency === item.id}
                    onClick={() => this.handleCurrencyChange(item)}
                  >
                    <span>
                      {item.id} ({item.symbol}) {item.name}
                    </span>
                  </ItemContainer>
                ));
              }}
            </Query>
            {}
          </div>
        </div>
      </Layout>
    );
  }
}

export default BaseCurrency;
