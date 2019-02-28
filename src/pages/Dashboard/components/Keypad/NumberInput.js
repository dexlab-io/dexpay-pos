import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Textfit } from 'react-textfit';
import { isNaN } from 'lodash';

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

  return (
    <Container>
      <Textfit mode="single" max={72}>
        <FormatCurrency value={parseFloat(formattedValue)} />
      </Textfit>
    </Container>
  );
};

NumberInput.propTypes = {
  value: PropTypes.string.isRequired
};

export default NumberInput;
