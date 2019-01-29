import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { formatCurrency } from '../../../utils/helpers';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const FiatAmount = ({ fiatAmount }) => {
  return (
    <Container>
      <span className="has-text-weight-light is-size-1">
        {formatCurrency(fiatAmount)}
      </span>
    </Container>
  );
};

FiatAmount.propTypes = {
  fiatAmount: 0
};

FiatAmount.propTypes = {
  fiatAmount: PropTypes.string.isRequired
};

export default FiatAmount;
