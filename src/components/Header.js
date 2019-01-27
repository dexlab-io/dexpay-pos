import React from 'react';
import styled from 'styled-components';

import barsImg from '../assets/images/bars.png';

const Container = styled.section`
  padding: 1rem 1.5rem;
`;

const Header = ({ header }) => (
  <Container className="section">
    <div className="container is-fluid">
      <a>
        <img src={barsImg} alt="side menu" />
      </a>
      {header && <h3 className="title">Header title here</h3>}
    </div>
  </Container>
);

export default Header;
