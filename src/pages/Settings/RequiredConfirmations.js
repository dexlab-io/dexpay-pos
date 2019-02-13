import React from 'react';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import SettingsHeader from './components/SettingsHeader';
import Breadcrumb from './components/Breadcrumb';
import { Slider } from '../../components/elements';

class RequiredConfirmations extends React.Component {
  state = { value: 50 };

  render() {
    const { history } = this.props;
    const { value } = this.state;

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
            <Slider
              value={value}
              onChange={e => this.setState({ value: e.target.value })}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default RequiredConfirmations;
