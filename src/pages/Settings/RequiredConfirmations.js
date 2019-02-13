import React from 'react';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';

const RequiredConfirmations = props => {
  const { history } = props;

  return (
    <Layout header={{ isVisible: false }}>
      <Seo title="Required Confirmations" />
      <div className="section">
        <div className="container">
          <SettingsHeader history={history} />
          <Breadcrumb
            history={history}
            title="Required Confirmations"
            icon="link-icon.png"
          />
          <p>RequiredConfirmations slider here</p>
        </div>
      </div>
    </Layout>
  );
};

export default RequiredConfirmations;
