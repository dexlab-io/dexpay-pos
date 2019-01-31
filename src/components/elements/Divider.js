import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 0px;
  width: 100%;
  border-bottom: ${props => `1px ${props.isDotted ? 'dashed' : 'solid'} #000`};
`;

const Divider = ({ isDotted }) => {
  return <Container isDotted={isDotted} />;
};

export default Divider;
