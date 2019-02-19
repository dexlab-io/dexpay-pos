import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import barsImg from '../assets/images/bars.png';
import backImg from '../assets/images/back.png';
import logoImg from '../assets/images/logo.png';

const Section = styled.section`
  grid-area: header;
  padding: 1rem 1.5rem;
  @media only screen and (max-width: ${props => props.theme.mobileBreakpoint}) {
    padding: 0rem 1.5rem;
  }
`;
const Container = styled.div`
  height: 120px;
  @media only screen and (max-width: ${props => props.theme.mobileBreakpoint}) {
    height: 90px;
  }
`;

const Columns = styled.div`
  height: 100%;
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
  height: 93%;
  align-items: center;
  @media only screen and (max-width: ${props => props.theme.mobileBreakpoint}) {
    margin-top: 10px;
  }
`;

const Header = props => {
  const {
    leftIcon,
    hideNav,
    isVisible,
    title,
    leftBtnClick,
    onNavItemClick
  } = props;

  if (!isVisible) {
    return null;
  }

  return (
    <Section className="section">
      <Container className="container">
        <Columns className="columns is-mobile">
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
            <div className="column">
              <Nav
                className="navbar"
                role="navigation"
                aria-label="main navigation"
              >
                <LogoContainer className="navbar-brand">
                  <Logo src={logoImg} alt="Dexpay logo" />
                </LogoContainer>
                <div className="navbar-menu">
                  <div className="navbar-start">
                    <MenuItem
                      className="navbar-item is-active"
                      onClick={() => onNavItemClick('numberPad')}
                    >
                      Number Pad
                    </MenuItem>
                    <MenuItem
                      className="navbar-item"
                      onClick={() => onNavItemClick('productItems')}
                    >
                      Product Items
                    </MenuItem>
                    <MenuItem
                      className="navbar-item"
                      onClick={() => onNavItemClick('recentPayments')}
                    >
                      Recent Transactions
                    </MenuItem>
                  </div>
                </div>
              </Nav>
            </div>
          )}
        </Columns>
      </Container>
    </Section>
  );
};

Header.defaultProps = {
  leftIcon: 'menu',
  hideNav: false,
  isVisible: true,
  title: undefined,
  leftBtnClick: () => {},
  onNavItemClick: () => {}
};

Header.propTypes = {
  leftIcon: PropTypes.string,
  hideNav: PropTypes.bool,
  isVisible: PropTypes.bool,
  title: PropTypes.string,
  leftBtnClick: PropTypes.func,
  onNavItemClick: PropTypes.func
};

export default Header;
