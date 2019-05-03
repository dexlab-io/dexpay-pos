import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { indexOf, find } from 'lodash';

import apolloClient from '../../utils/apolloClient';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';
import TokenItem from './components/TokenItem';
import settingsItems from './components/settingsItems';

const query = gql`
  {
    acceptedTokens @client
  }
`;

const mutation = gql`
  mutation toggleAcceptedTokens($token: String!, $isAccepted: Boolean!) {
    toggleAcceptedTokens(token: $token, isAccepted: $isAccepted) @client
    updateMe(input: { tokenName: $token, tokenAccepted: $isAccepted }) {
      id
    }
  }
`;

const networksList = [
  // { id: 'ether', name: 'Ether', image: 'crypto-icon.png' },
  // { id: 'dai', name: 'DAI', image: 'crypto-icon.png' },
  { id: 'xdai', name: 'xDAI', image: 'crypto-icon.png' }
  // { id: 'wbtc', name: 'WBTC (comming soon)', image: 'crypto-icon.png' }
];

class AcceptedTokens extends React.Component {
  handleSwitch = (token, isAccepted) => {
    apolloClient.mutate({
      mutation,
      variables: { token: token.id, isAccepted }
    });
  };

  render() {
    const { history } = this.props;
    const settingItem = find(settingsItems, {
      linkTo: '/settings/accepted-tokens'
    });

    return (
      <Layout header={{ isVisible: false }}>
        <Seo title="Accepted Tokens" />
        <div className="section">
          <div className="container">
            <SettingsHeader history={history} />
            <Breadcrumb history={history} {...settingItem} />
            <Query query={query}>
              {({ data, loading, error }) => {
                if (loading && !data.acceptedTokens) return <p>loading...</p>;
                if (error) return <p>Error: {error.message}</p>;

                return networksList.map(item => (
                  <TokenItem
                    key={item.id}
                    isAccepted={indexOf(data.acceptedTokens, item.id) !== -1}
                    token={item}
                    handleChange={this.handleSwitch}
                  />
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
