import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { find } from 'lodash';

import apolloClient from '../../utils/apolloClient';
import { Loading, Message } from '../../components/elements';
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
            <Query query={query} fetchPolicy="cache-only">
              {({ data, loading, error }) => {
                if (loading && !data.currency) return <Loading />;
                if (error)
                  return <Message type="error">{error.message}</Message>;

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
