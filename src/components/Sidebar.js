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

const Sidebar = () => (
  <Container>
    <aside className="menu">
      <Logo src={logoImg} alt="Dexpay logo" />
      <ItemsList className="menu-list">
        <Item>
          <Link to="settings">Account Settings</Link>
        </Item>
        <Item>
          <a>About Dexpay</a>
        </Item>
        <Item>
          <a>Send a Feedback</a>
        </Item>
        <Item>
          <a>Logout</a>
        </Item>
      </ItemsList>
    </aside>
  </Container>
);

export default Sidebar;
