import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import barsImg from '../assets/images/bars.png';
import backImg from '../assets/images/back.png';
import logoImg from '../assets/images/logo.png';

const Container = styled.section`
  padding: 2rem 1.5rem;
  @media only screen and (max-width: ${props => props.theme.mobileBreakpoint}) {
    padding: 2rem 1.5rem;
  }
`;
const LeftSide = styled.div`
  &&&&& {
    display: flex;
    align-items: center;
    width: 10%;
  }
`;
const LeftLink = styled.a`
  cursor: pointer;
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
  width: 58px;
  height: auto;
`;

const MenuItem = styled.a`
  font-size: 18px;
  padding: 0.5rem 2.75rem;
  &.is-active {
    text-decoration: underline;
  }
`;

const Nav = styled.nav`
  z-index: 0;
`;

const Header = ({ leftIcon, hideNav, title, leftBtnClick, onNavItemClick }) => (
  <Container className="section">
    <div className="container is-fluid">
      <div className="columns is-mobile">
        <LeftSide className="column is-one-fifth">
          <LeftLink onClick={leftBtnClick}>
            {leftIcon === 'menu' && <img src={barsImg} alt="side menu" />}
            {leftIcon === 'back' && <img src={backImg} alt="back button" />}
          </LeftLink>
        </LeftSide>
        {hideNav ? (
          <React.Fragment>
            <div className="column is-four-fifths has-text-centered">
              <span className="is-family-secondary">{title}</span>
            </div>
            <div className="column is-one-fifth" />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Nav
              className="navbar"
              role="navigation"
              aria-label="main navigation"
            >
              <LogoContainer className="navbar-brand">
                <Logo src={logoImg} alt="Dexpay logo" />
              </LogoContainer>
            </Nav>
            <div className="column is-hidden-mobile">
              <MenuItem
                className=" is-active"
                onClick={() => onNavItemClick('numberPad')}
              >
                Number Pad
              </MenuItem>
              <MenuItem
                className=""
                onClick={() => onNavItemClick('recentPayments')}
              >
                Recent Transactions
              </MenuItem>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  </Container>
);

Header.defaultProps = {
  leftIcon: 'menu',
  hideNav: false,
  title: undefined,
  leftBtnClick: () => {},
  onNavItemClick: () => {}
};

Header.propTypes = {
  leftIcon: PropTypes.string,
  hideNav: PropTypes.bool,
  title: PropTypes.string,
  leftBtnClick: PropTypes.func,
  onNavItemClick: PropTypes.func
};

export default Header;
