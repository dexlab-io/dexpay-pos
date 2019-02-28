import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import currency from 'currency.js';
import { Textfit } from 'react-textfit';
import { isNaN } from 'lodash';

// import config from '../../../../config';
import FormatCurrency from '../../../../components/FormatCurrency';

const Container = styled.div`
  height: 68px;
  margin: 10px auto 0 auto;
  display: block;
  width: 100%;
  max-width: 540px;
  text-align: center;
  font-weight: 300;
`;

const NumberInput = ({ value }) => {
  const formattedValue = isNaN(value) || value === '.' ? '0' : value;
  // const language = navigator.language || 'en-US';
  // formattedValue = parseFloat(value).toLocaleString(language, {
  //   useGrouping: true,
  //   maximumFractionDigits: 6
  // });

  // Add back missing .0 in e.g. 12.0
  // const val = parseFloat(value);
  // const match = val.match(/\.\d*?(0*)$/);
  // if (match) formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];

  // formattedValue = currency(formattedValue, {
  //   symbol: `${config.currency.symbol}`,
  //   formatWithSymbol: true
  // }).format();

  return (
    <Container>
      <Textfit mode="single" max={72}>
        {/* {formattedValue} */}
        <FormatCurrency value={parseFloat(formattedValue)} />
      </Textfit>
    </Container>
  );
};

NumberInput.propTypes = {
  value: PropTypes.string.isRequired
};

export default NumberInput;
