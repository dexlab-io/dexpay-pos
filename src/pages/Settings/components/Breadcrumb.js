/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

import React from 'react';
import styled from 'styled-components';

const Container = styled.a`
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;
const ItemTitle = styled.span``;
const ItemIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 15px;
  margin-right: 15px;
`;
const ItemLeftIcon = styled.i``;

const Breadcrumb = ({ history, title, icon }) => {
  return (
    <Container onClick={() => history.goBack()}>
      <ItemLeftIcon className="fas fa-angle-left" />
      <ItemIcon alt={title} src={require(`../../../assets/images/${icon}`)} />
      <ItemTitle>{title}</ItemTitle>
    </Container>
  );
};

export default Breadcrumb;
