import React from 'react';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';

const WalletAddress = props => {
  const { history } = props;

  return (
    <Layout header={{ isVisible: false }}>
      <Seo title="Settings" description="POS System" />
      <div className="section">
        <div className="container">
          <SettingsHeader history={history} />
          <Breadcrumb
            history={history}
            title="Wallet Address"
            icon="wallet-icon.png"
          />
        </div>
      </div>
    </Layout>
  );
};

export default WalletAddress;
