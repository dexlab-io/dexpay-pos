import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';
import AccountInfoForm from './components/AccountInfoForm';

const query = gql`
  {
    user @client {
      id
      fullName
      email
    }
  }
`;

const mutation = gql`
  mutation updateUser($shopName: String!, $email: String!) {
    updateUser(input: { shopName: $shopName, email: $email }) @client {
      id
      shopName
      email
    }
  }
`;

const AccountInfo = props => {
  const { history } = props;

  return (
    <Layout header={{ isVisible: false }}>
      <Seo title="Account Info" />
      <div className="section">
        <div className="container">
          <SettingsHeader history={history} />
          <Breadcrumb
            history={history}
            title="Account Info & Password"
            icon="key-icon.png"
          />
          <Query query={query} fetchPolicy="cache-and-network">
            {({ data, loading, error }) => {
              if (loading && !data.user) return <p>loading...</p>;
              if (error) return <p>Error: {error.message}</p>;
              // console.log('data', data);

              return (
                <AccountInfoForm
                  handleSubmit={values =>
                    console.log('AccountInfoForm submit', values)
                  }
                />
              );
            }}
          </Query>
        </div>
      </div>
    </Layout>
  );
};

export default AccountInfo;
