import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PointTarget from 'react-point';

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Text = styled.span`
  font-size: 48px;
`;

const KeypadKey = ({ text, onClick }) => (
  <PointTarget onPoint={() => onClick(text)}>
    <Container className="has-text-centered">
      <Text className="has-text-weight-light">{text}</Text>
    </Container>
  </PointTarget>
);

KeypadKey.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default KeypadKey;
