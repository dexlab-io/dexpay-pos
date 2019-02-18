/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding-top: 20px;
  padding-bottom: 50px;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;
const CrossIcon = styled.i`
  position: absolute;
  right: 2px;
  top: 27px;
`;

const SettingsHeader = ({ history }) => {
  return (
    <Container>
      <h2 className="title">Account Settings</h2>
      <a onClick={() => history.goBack()}>
        <CrossIcon className="fas fa-times" />
      </a>
    </Container>
  );
};

export default SettingsHeader;
