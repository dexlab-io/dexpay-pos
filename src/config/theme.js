/* eslint no-unused-expressions: 0 */

import { createGlobalStyle } from 'styled-components';

// http://chir.ag/projects/name-that-color/
export const colors = {
  caribbeanGreen: '#00D1B2'
};

export default {
  primary: colors.caribbeanGreen
};

export const GlobalStyle = createGlobalStyle`
  body {
		margin: 0;
  	padding: 0;
  }
`;
