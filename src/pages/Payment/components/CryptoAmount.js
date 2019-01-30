import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import cryptoIcon from '../../../assets/dummy/crypto-icon.png';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SelectContainer = styled.div`
  border: 1px solid #383838;
  border-radius: 4;
  padding: 15px;
`;
const Image = styled.img`
  margin-right: 12px;
  width: 32px;
  height: 32px;
`;

const CryptoAmount = ({ cryptoCurrency, cryptoValue, hasSelection }) => {
  const activeItem = (
    <Container>
      <Image src={cryptoIcon} alt={cryptoCurrency} />
      <span>{cryptoCurrency}&nbsp;</span>
      <span className="has-text-weight-light">{cryptoValue}</span>
    </Container>
  );

  if (hasSelection) {
    return <SelectContainer>{activeItem}</SelectContainer>;
  }

  return activeItem;
};

CryptoAmount.propTypes = {
  fiatAmount: 0,
  cryptoValue: 0,
  hasSelection: false,
  cryptoCurrency: 'DAI'
};

CryptoAmount.propTypes = {
  fiatAmount: PropTypes.number,
  cryptoValue: PropTypes.number,
  hasSelection: PropTypes.bool,
  cryptoCurrency: PropTypes.string
};

export default CryptoAmount;
