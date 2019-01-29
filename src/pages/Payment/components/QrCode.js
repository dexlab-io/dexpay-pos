import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div``;

const QrCode = ({ value }) => {
  return <Container>Qr code {value}</Container>;
};

QrCode.propTypes = {
  value: 0
};

QrCode.propTypes = {
  value: PropTypes.string.isRequired
};

export default QrCode;
