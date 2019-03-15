import { createGlobalStyle } from 'styled-components';

export const elements = { mobileBreakpoint: 800 };

// http://chir.ag/projects/name-that-color/
export const colors = {
  black: '#000000',
  riptide: '#83E8E1'
};

const theme = {
  mobileBreakpoint: `${elements.mobileBreakpoint}px`,
  primaryColor: colors.black,
  secondaryColor: colors.riptide,
  primaryFontFamily: '"Quicksand", sans-serif',
  secondaryFontFamily: '"Open Sans", sans-serif',
  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightSemiBold: '600',
  fontWeightBold: '700',
  fontSizeReguar: '400',
  borderColor: '#D6D6D6'
};

export default theme;

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    background: #F6F9FC;
  }
  .whiteBG {
    background: #FFF;
  }
  #root {
    height: 100%;
  }
  a {
    color: ${theme.primaryColor};
  }
  a.navbar-item.is-active, .navbar-link.is-active {
    background: transparent;
  }
  @media screen and (min-width: 800px) {
    .navbar, .navbar-menu, .navbar-start, .navbar-end {
      align-items: stretch;
      display: flex;
    }
    .navbar-menu {
      flex-grow: 1;
      flex-shrink: 0;
      box-shadow: none;
    }
  }

  .rc-slider-track {
    background-color: #000000 !important;
  }
  .rc-slider-handle {
    border: 2px solid #000000 !important;
    background-color: #fff !important;
  }
`;
