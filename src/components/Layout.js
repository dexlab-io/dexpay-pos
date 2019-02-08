import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Sidebar from 'react-sidebar';

import config from '../config';
import Header from './Header';

const Container = styled.div``;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
  }

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  render() {
    const { children, header } = this.props;
    const { sidebarOpen } = this.state;

    return (
      <Container>
        <Helmet title={config.siteName} />
        <Header {...header} />
        <Sidebar
          sidebar={<b>Sidebar content</b>}
          open={sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: 'white' } }}
        >
          <button type="button" onClick={() => this.onSetSidebarOpen(true)}>
            Open sidebar
          </button>
        </Sidebar>
        {children}
      </Container>
    );
  }
}

Layout.defaultProps = {
  header: {}
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.object
};

export default Layout;
