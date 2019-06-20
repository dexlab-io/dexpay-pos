import React from 'react';

import config from '../config';

class DashboardOpener extends React.Component {
  render() {
    const { children } = this.props;
    const link = config.dashboardUrl;
    const token = window.localStorage.getItem('token');

    return <a href={`${link}/jwt-login/${token}`}>{children}</a>;
  }
}

export default DashboardOpener;
