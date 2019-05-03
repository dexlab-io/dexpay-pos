import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { find, isNull } from 'lodash';

import apolloClient from '../../utils/apolloClient';
import config from '../../config';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';
import settingsItems from './components/settingsItems';

const query = gql`
  {
    currency @client
  }
`;

const mutation = gql`
  mutation updateCurrency($currency: String!) {
    updateCurrency(currency: $currency) @client
    updateMe(input: { walletCurrency: $currency }) {
      id
    }
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

class BaseCurrency extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currency: null };
    this.mutationTimeout = undefined;
  }

  componentWillUnmount() {
    clearTimeout(this.mutationTimeout);
  }

  handleChange = currency => {
    this.setState({ currency: currency.id });

    clearTimeout(this.mutationTimeout);
    this.mutationTimeout = setTimeout(() => {
      apolloClient.mutate({ mutation, variables: { currency: currency.id } });
    }, 800);
  };

  render() {
    const { currency } = this.state;
    const { history } = this.props;
    const settingItem = find(settingsItems, {
      linkTo: '/settings/base-currency'
    });

    return (
      <Layout header={{ isVisible: false }}>
        <Seo title="Base Currency" />
        <div className="section">
          <div className="container">
            <SettingsHeader history={history} />
            <Breadcrumb history={history} {...settingItem} />
            <Query
              query={query}
              onCompleted={data => {
                if (isNull(currency)) {
                  this.setState({ currency: data.currency });
                }
              }}
            >
              {({ loading, error }) => {
                if (loading && isNull(currency)) return <p>loading...</p>;
                if (error) return <p>Error: {error.message}</p>;
                // console.log('data.currency', data);

                return config.currencies.map(item => (
                  <ItemContainer
                    key={item.id}
                    active={currency === item.id}
                    onClick={() => this.handleChange(item)}
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
