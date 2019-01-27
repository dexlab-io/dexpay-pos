/* eslint no-unused-expressions: 0 */

import { injectGlobal } from 'styled-components';

// http://chir.ag/projects/name-that-color/
export const colors = {
  caribbeanGreen: '#00D1B2'
};

export default {
  primary: colors.caribbeanGreen
};

injectGlobal`
  body {
		margin: 0;
  	padding: 0;
  }
`;
