import React from 'react';
import styled from 'styled-components';

const EmojiContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: ${props => props.bgColor};
  margin-right: 15px;
  padding-left: 3px;
  font-size: 20px;
`;

const SettingsEmoji = ({ emoji, bgColor }) => (
  <EmojiContainer bgColor={bgColor}>
    <span>{emoji}</span>
  </EmojiContainer>
);

export default SettingsEmoji;
