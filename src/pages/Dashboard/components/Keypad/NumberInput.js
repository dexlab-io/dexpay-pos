import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import currency from 'currency.js';
import { Textfit } from 'react-textfit';

import config from '../../../../config';

const Container = styled.div`
  height: auto;
  margin-top: 3rem;
  display: block;
  width: 100%;
  max-width: 540px;
  text-align: center;
  font-weight: 300;
`;

const NumberInput = ({ value }) => {
  const language = navigator.language || 'en-US';
  let formattedValue = parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6
  });

  // Add back missing .0 in e.g. 12.0
  // const val = parseFloat(value);
  // const match = val.match(/\.\d*?(0*)$/);
  // if (match) formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];

  formattedValue = currency(parseFloat(value), {
    symbol: `${config.currency.symbol}`,
    formatWithSymbol: true
  }).format();

  return (
    <Container>
      <Textfit mode="single" max={72}>
        {formattedValue}
      </Textfit>
    </Container>
  );
};

NumberInput.propTypes = {
  value: PropTypes.number.isRequired
};

export default NumberInput;
