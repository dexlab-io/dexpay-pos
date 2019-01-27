import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import config from '../config';
import Header from './Header';

const Container = styled.div``;

const Layout = ({ children }) => (
  <Container>
    <Helmet title={config.siteName} />
    <Header />
    {children}
  </Container>
);

export default Layout;
