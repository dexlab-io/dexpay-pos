import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Textfit } from 'react-textfit';

import FormatCurrency from '../../../components/FormatCurrency';

const Container = styled.div`
  font-weight: 300;
  text-align: center;
`;

const FiatAmount = ({ fiatAmount }) => {
  return (
    <Container>
      <Textfit mode="single" max={72}>
        <FormatCurrency value={fiatAmount} />
      </Textfit>
    </Container>
  );
};

FiatAmount.defaultProps = {
  fiatAmount: 0
};

FiatAmount.propTypes = {
  fiatAmount: PropTypes.number
};

export default FiatAmount;
