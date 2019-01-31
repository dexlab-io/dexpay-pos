import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import currency from 'currency.js';

import AutoScalingText from './AutoScalingText';
import config from '../../../../config';

const Container = styled.div`
  position: relative;
  height: 4rem;
  margin-top: 3rem;
`;
const Text = styled.span`
  font-size: 72px;
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
    symbol: `${config.currency}`,
    formatWithSymbol: true
  }).format();

  return (
    <Container>
      <AutoScalingText>
        <Text className="has-text-weight-light">{formattedValue}</Text>
      </AutoScalingText>
    </Container>
  );
};

NumberInput.propTypes = {
  value: PropTypes.number.isRequired
};

export default NumberInput;
