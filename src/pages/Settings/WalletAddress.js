import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { find } from 'lodash';

import apolloClient from '../../utils/apolloClient';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';
import WalletAddressForm from './components/WalletAddressForm';
import settingsItems from './components/settingsItems';

const query = gql`
  {
    walletAddress @client
  }
`;

const mutation = gql`
  mutation updateWalletAddress($address: String!) {
    updateWalletAddress(address: $address) @client
    updateMe(input: { walletAddress: $address }) {
      id
    }
  }
`;

class WalletAddress extends React.Component {
  handleUpdate = data => {
    return apolloClient.mutate({
      mutation,
      variables: { address: data.walletAddress, source: 'manualInput' }
    });
  };

  render() {
    const { history } = this.props;
    const settingItem = find(settingsItems, {
      linkTo: '/settings/wallet-address'
    });

    return (
      <Layout header={{ isVisible: false }}>
        <Seo title="Wallet Address" />
        <div className="section">
          <div className="container">
            <SettingsHeader history={history} />
            <Breadcrumb history={history} {...settingItem} />
            <Query query={query} fetchPolicy="cache-and-network">
              {({ data, loading, error }) => {
                if (loading && !data.currency) return <p>loading...</p>;
                if (error) return <p>Error: {error.message}</p>;

                return (
                  <WalletAddressForm
                    initialValues={{ walletAddress: data.walletAddress || '' }}
                    handleUpdate={this.handleUpdate}
                  />
                );
              }}
            </Query>
          </div>
        </div>
      </Layout>
    );
  }
}

export default WalletAddress;
