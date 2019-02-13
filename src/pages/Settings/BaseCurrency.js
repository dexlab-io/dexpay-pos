import React from 'react';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';

const BaseCurrency = props => {
  const { history } = props;

  return (
    <Layout header={{ isVisible: false }}>
      <Seo title="Base Currency" />
      <div className="section">
        <div className="container">
          <SettingsHeader history={history} />
          <Breadcrumb
            history={history}
            title="Base Currency"
            icon="currency-icon.png"
          />
          <p>currency list here</p>
        </div>
      </div>
    </Layout>
  );
};

export default BaseCurrency;
