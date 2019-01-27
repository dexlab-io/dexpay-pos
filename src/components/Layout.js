import React from 'react';
import Helmet from 'react-helmet';

import config from '../config';
import Header from './Header';

const Layout = ({ children }) => (
  <div>
    <Helmet title={config.siteName} />
    <Header />
    {children}
  </div>
);

export default Layout;
