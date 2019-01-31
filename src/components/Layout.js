import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import config from '../config';
import Header from './Header';

const Container = styled.div``;

const Layout = ({ children, header }) => (
  <Container>
    <Helmet title={config.siteName} />
    <Header {...header} />
    {children}
  </Container>
);

Layout.defaultProps = {
  header: {}
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.object
};

export default Layout;
