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
  display: ${props => (props.hasHeader ? 'grid' : 'block')};
  grid-template-areas:
    'header'
    'content';
  grid-template-rows: 120px auto;
  height: 100%;
  @media only screen and (max-width: ${props => props.theme.mobileBreakpoint}) {
    grid-template-rows: 90px auto;
  }
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
    const { children, header, activeNavItem } = this.props;
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
          <Wrapper hasHeader={header.isVisible || true}>
            <Header
              leftBtnClick={() => this.onSetSidebarOpen(true)}
              activeNavItem={activeNavItem}
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
  header: {},
  activeNavItem: ''
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.object,
  activeNavItem: PropTypes.string
};

export default Layout;
