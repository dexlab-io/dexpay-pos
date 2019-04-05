import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Textfit } from 'react-textfit';

import FormatCurrency from './FormatCurrency';

const Container = styled.div`
  font-weight: 300;
  text-align: center;
`;

const FiatAmount = ({ fiatAmount, fiatCurrency }) => {
  return (
    <Container>
      <Textfit mode="single" max={72}>
        <FormatCurrency currency={fiatCurrency} value={fiatAmount} />
      </Textfit>
    </Container>
  );
};

FiatAmount.defaultProps = {
  fiatAmount: 0,
  fiatCurrency: undefined
};

FiatAmount.propTypes = {
  fiatAmount: PropTypes.number,
  fiatCurrency: PropTypes.string
};

export default FiatAmount;
