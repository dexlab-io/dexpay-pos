import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Clipboard from 'react-clipboard.js';
import { Trans } from 'react-i18next';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  margin-bottom: 25px;
`;
const ClipboardBtn = styled(Clipboard)`
  background: none;
  border: none;
  padding: 0;
  margin-left: 10px;
`;
const Input = styled.input`
  background-color: #000000;
  color: #ffffff;
`;

const AddressClipboard = ({ address }) => {
  return (
    <Container>
      <span>
        <Trans>To</Trans>:
      </span>
      <ClipboardBtn data-clipboard-text={address}>
        <Input
          className="input"
          type="text"
          value={address}
          onChange={() => {}}
        />
      </ClipboardBtn>
    </Container>
  );
};

AddressClipboard.propTypes = {
  address: PropTypes.string.isRequired
};

export default AddressClipboard;
