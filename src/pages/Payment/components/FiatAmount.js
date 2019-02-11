import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { formatCurrency } from '../../../utils/helpers';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Amount = styled.span`
  font-size: 72px;
`;

const FiatAmount = ({ fiatAmount }) => {
  return (
    <Container>
      <Amount className="has-text-weight-light">
        {formatCurrency(fiatAmount)}
      </Amount>
    </Container>
  );
};

FiatAmount.propTypes = {
  fiatAmount: 0
};

FiatAmount.propTypes = {
  fiatAmount: PropTypes.number
};

export default FiatAmount;
