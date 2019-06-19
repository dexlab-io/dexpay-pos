/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logoImg from '../assets/images/dex-logo.png';

const Container = styled.div`
  padding: 40px;
`;
const Logo = styled.img`
  width: 158px;
  height: auto;
`;

const ItemsList = styled.ul`
  margin-top: 30px;
`;
const Item = styled.li`
  padding: 15px 0;
`;

class Sidebar extends React.Component {
  handleLogout = () => {
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace('/');
  };

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Container>
        <aside className="menu">
          <Logo src={logoImg} alt="Dexpay logo" />
          <ItemsList className="menu-list">
            <Item>
              <Link to="/settings">Account Settings</Link>
            </Item>
            <Item>
              <a
                href="https://dashboard.dexpay.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                Admin Dashboard
              </a>
            </Item>
            <Item>
              <a
                href="https://medium.com/dexlab-io/introducing-dexpay-and-makerdao-grant-announcement-f437f2e87da3"
                target="_blank"
                rel="noopener noreferrer"
              >
                About Dexpay
              </a>
            </Item>
            <Item>
              <a href="mailto:dev@dexlab.io">Send a Feedback</a>
            </Item>
            {isLoggedIn ? (
              <Item>
                <a onClick={this.handleLogout}>Logout</a>
              </Item>
            ) : (
              <Item>
                <Link to="/login">Login</Link>
              </Item>
            )}
          </ItemsList>
        </aside>
      </Container>
    );
  }
}

export default Sidebar;
