import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { find } from 'lodash';
import swal from 'sweetalert';

import apolloClient from '../../utils/apolloClient';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';
import AccountInfoForm from './components/AccountInfoForm';
import settingsItems from './components/settingsItems';

const query = gql`
  {
    me {
      id
      email
      store {
        name
      }
    }
  }
`;

const mutation = gql`
  mutation updateMe($shopName: String!, $email: String!) {
    updateMe(input: { shopName: $shopName, email: $email }) @client {
      id
      email
      store {
        name
      }
    }
  }
`;

class AccountInfo extends React.Component {
  handleUpdate = data => {
    apolloClient.mutate({ mutation, variables: { data } });
    swal('Success!', 'Account info updated!', 'success');
  };

  render() {
    const { history } = this.props;
    const settingItem = find(settingsItems, {
      linkTo: '/settings/account-info'
    });

    return (
      <Layout header={{ isVisible: false }}>
        <Seo title="Account Info" />
        <div className="section">
          <div className="container">
            <SettingsHeader history={history} />
            <Breadcrumb history={history} {...settingItem} />
            <Query query={query} fetchPolicy="cache-and-network">
              {({ data, loading, error }) => {
                if (loading && !data.me) return <p>loading...</p>;
                if (error) return <p>Error: {error.message}</p>;
                // console.log('data', data);

                return (
                  <AccountInfoForm
                    initialValues={data.me || {}}
                    handleSubmit={this.handleUpdate}
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

export default AccountInfo;
