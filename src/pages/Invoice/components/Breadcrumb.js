import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.active ? '#000000' : '#cccccc')};
  height: 25px;
  width: 25px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 300;
  color: ${props => (props.active ? '#ffffff' : '#000000')};
  margin: 0 10px;
`;

const Text = styled.span`
  font-size: 12px;
  font-weight: 300;
  margin: 0 10px;
`;

const Breadcrumb = ({ step, text, goToStep }) => {
  const textNode = <Text>{text}</Text>;

  return (
    <Container>
      <Circle active={step === 1} onClick={() => goToStep(1)}>
        <span>1</span>
      </Circle>
      {step === 1 && textNode}
      <Circle active={step === 2} onClick={() => goToStep(2)}>
        <span>2</span>
      </Circle>
      {step === 2 && textNode}
      <Circle active={step === 3} onClick={() => goToStep(3)}>
        <span>3</span>
      </Circle>
      {step === 3 && textNode}
    </Container>
  );
};

Breadcrumb.defaultProps = {
  step: 1,
  text: ''
};

Breadcrumb.propTypes = {
  step: PropTypes.number,
  text: PropTypes.string
};

export default Breadcrumb;
