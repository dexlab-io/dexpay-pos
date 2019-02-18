import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Sidebar from 'react-sidebar';

import config from '../config';
import Header from './Header';
import MySidebar from './Sidebar';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    'header'
    'content';
  grid-template-rows: 120px auto;
  height: 100%;
`;

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
        <Sidebar
          sidebar={<MySidebar />}
          shadow={false}
          open={sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: 'white', minWidth: ' 340px' } }}
        >
          <Wrapper>
            <Header
              leftBtnClick={() => this.onSetSidebarOpen(true)}
              {...header}
            />
            {children}
          </Wrapper>
        </Sidebar>
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
