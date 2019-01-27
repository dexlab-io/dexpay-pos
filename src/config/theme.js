import { createGlobalStyle } from 'styled-components';

// http://chir.ag/projects/name-that-color/
export const colors = {
  black: '#000000',
  riptide: '#83E8E1'
};

export default {
  primaryColor: colors.black,
  secondaryColor: colors.riptide,
  primaryFontFamily: 'Quicksand, sans-serif',
  secondaryFontFamily: 'Open Sans, sans-serif',
  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightSemiBold: '600',
  fontWeightBold: '700',
  fontSizeReguar: '400'
};

export const GlobalStyle = createGlobalStyle`
  body {
		margin: 0;
  	padding: 0;
  }
`;
