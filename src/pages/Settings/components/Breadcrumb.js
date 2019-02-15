import React from 'react';
import styled from 'styled-components';

import SettingsEmoji from './SettingsEmoji';

const Container = styled.a`
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;
const ItemTitle = styled.span``;
const ItemLeftIcon = styled.i`
  margin-right: 15px;
`;

const Breadcrumb = ({ history, title, bgColor, emoji }) => {
  return (
    <Container onClick={() => history.push('/settings')}>
      <ItemLeftIcon className="fas fa-angle-left" />
      <SettingsEmoji bgColor={bgColor} emoji={emoji} />
      <ItemTitle>{title}</ItemTitle>
    </Container>
  );
};

export default Breadcrumb;
