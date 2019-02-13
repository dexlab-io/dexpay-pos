import React from 'react';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';
import AccountInfoForm from './components/AccountInfoForm';

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
          <AccountInfoForm
            handleSubmit={values =>
              console.log('AccountInfoForm submit', values)
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default AccountInfo;
