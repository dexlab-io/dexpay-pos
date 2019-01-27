import React from 'react';
import Helmet from 'react-helmet';

import config from '../config';

const Layout = ({ children }) => (
  <div>
    <Helmet title={config.siteName} />
    {children}
  </div>
);

export default Layout;
