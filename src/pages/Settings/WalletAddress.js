import React from 'react';

import Layout from '../../components/Layout';
import { TextGroup } from '../../components/elements';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';
import WalletAddressForm from './components/WalletAddressForm';

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
          <WalletAddressForm
            handleSubmit={values =>
              console.log('WalletAddressForm submit', values)
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default WalletAddress;
