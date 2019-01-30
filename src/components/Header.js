import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import barsImg from '../assets/images/bars.png';
import backImg from '../assets/images/back.png';

const Container = styled.section`
  padding: 1rem 1.5rem;
`;
const Title = styled.span``;

const Header = ({ title, leftIcon }) => (
  <Container className="section">
    <div className="container is-fluid">
      <div className="columns is-mobile">
        <div className="column is-one-quarter">
          <a>
            {leftIcon === 'menu' && <img src={barsImg} alt="side menu" />}
            {leftIcon === 'back' && <img src={backImg} alt="back button" />}
          </a>
        </div>
        <div className="column is-half has-text-centered">
          <Title className="is-family-secondary	">{title}</Title>
        </div>
        <div className="column is-one-quarter" />
      </div>
    </div>
  </Container>
);

Header.defaultProps = {
  title: '',
  leftIcon: 'menu'
};

Header.propTypes = {
  title: PropTypes.string,
  leftIcon: PropTypes.string
};

export default Header;
