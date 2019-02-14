/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import apolloClient from '../../utils/apolloClient';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';
import { SwitchGroup } from '../../components/elements';

const query = gql`
  {
    acceptedTokens @client
  }
`;

const mutation = gql`
  mutation toggleAcceptedTokens($token: String!, $isAccepted: Boolean!) {
    toggleAcceptedTokens(token: $token, isAccepted: $isAccepted) @client
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 20px;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;
const ItemName = styled.span`
  margin: 0 15px;
`;
const SwitchContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const networksList = [
  { id: 'ether', name: 'Ether', image: 'crypto-icon.png' },
  { id: 'dai', name: 'DAI', image: 'crypto-icon.png' },
  { id: 'xdai', name: 'xDAI', image: 'crypto-icon.png' },
  { id: 'wbtc', name: 'WBTC (comming soon)', image: 'crypto-icon.png' }
];

class AcceptedTokens extends React.Component {
  handleSwitch = (token, isAccepted) => {
    apolloClient.mutate({ mutation, variables: { token, isAccepted } });
  };

  render() {
    const { history } = this.props;

    return (
      <Layout header={{ isVisible: false }}>
        <Seo title="Accepted Tokens" />
        <div className="section">
          <div className="container">
            <SettingsHeader history={history} />
            <Breadcrumb
              history={history}
              title="Accepted Tokens"
              icon="token-icon.png"
            />
            <Query query={query} fetchPolicy="cache-and-network">
              {({ data, loading, error }) => {
                if (loading && !data.acceptedTokens) return <p>loading...</p>;
                if (error) return <p>Error: {error.message}</p>;

                return networksList.map(item => (
                  <ItemContainer key={item.id}>
                    <img
                      src={require(`../../assets/dummy/${item.image}`)}
                      alt={item.name}
                    />
                    <ItemName className="has-text-weight-semibold">
                      {item.name}
                    </ItemName>
                    <SwitchContainer>
                      <SwitchGroup
                        name="123-3"
                        checked="checked"
                        onChange={() => this.handleSwitch(item, true)}
                      />
                    </SwitchContainer>
                  </ItemContainer>
                ));
              }}
            </Query>
          </div>
        </div>
      </Layout>
    );
  }
}

export default AcceptedTokens;
