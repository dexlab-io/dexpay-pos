import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding-top: 20px;
  padding-bottom: 50px;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;

const SettingsHeader = () => {
  return (
    <Container>
      <h2 className="title">Account Settings</h2>
    </Container>
  );
};

export default SettingsHeader;
