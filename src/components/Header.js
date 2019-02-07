import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import barsImg from '../assets/images/bars.png';
import backImg from '../assets/images/back.png';
import logoImg from '../assets/images/dex-logo.png';

const Container = styled.section`
  padding: 4rem 1.5rem;
  @media only screen and (max-width: ${props => props.theme.mobileBreakpoint}) {
    padding: 1rem 1.5rem;
  }
`;
const LeftSide = styled.div`
  &&&&& {
    display: flex;
    align-items: center;
    width: 10%;
  }
`;

const LogoContainer = styled.div`
  padding-top: 4px;
  margin-right: 4rem;
  align-items: center;
  @media only screen and (max-width: ${props => props.theme.mobileBreakpoint}) {
    justify-content: center;
    margin-right: 2rem;
  }
`;
const Logo = styled.img`
  width: 158px;
  height: auto;
`;

const MenuItem = styled.a`
  font-size: 18px;
  padding: 0.5rem 2.75rem;
  &.is-active {
    text-decoration: underline;
  }
`;

const Header = ({ leftIcon, hideNav, title, leftBtnClick }) => (
  <Container className="section">
    <div className="container is-fluid">
      <div className="columns is-mobile">
        <LeftSide className="column is-one-fifth">
          <a onClick={leftBtnClick}>
            {leftIcon === 'menu' && <img src={barsImg} alt="side menu" />}
            {leftIcon === 'back' && <img src={backImg} alt="back button" />}
          </a>
        </LeftSide>
        {hideNav ? (
          <React.Fragment>
            <div className="column is-four-fifths has-text-centered">
              <span className="is-family-secondary">{title}</span>
            </div>
            <div className="column is-one-fifth" />
          </React.Fragment>
        ) : (
          <div className="column">
            <nav
              className="navbar"
              role="navigation"
              aria-label="main navigation"
            >
              <LogoContainer className="navbar-brand">
                <Logo src={logoImg} alt="Dexpay logo" />
              </LogoContainer>
              <div className="navbar-menu">
                <div className="navbar-start">
                  <MenuItem className="navbar-item is-active">
                    Number Pad
                  </MenuItem>
                  <MenuItem className="navbar-item">
                    Recent Transactions
                  </MenuItem>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  </Container>
);

Header.defaultProps = {
  leftIcon: 'menu',
  hideNav: false,
  title: undefined,
  leftBtnClick: () => {}
};

Header.propTypes = {
  leftIcon: PropTypes.string,
  hideNav: PropTypes.bool,
  title: PropTypes.string,
  leftBtnClick: PropTypes.func
};

export default Header;
