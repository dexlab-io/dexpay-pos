import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Clipboard from 'react-clipboard.js';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const Input = styled.input`
  background-color: #000000;
  color: #ffffff;
`;

const AddressClipboard = ({ address }) => {
  return (
    <Container>
      <span>To:</span>
      <Clipboard data-clipboard-text={address}>
        <Input className="input" type="text" value={address} />
      </Clipboard>
    </Container>
  );
};

AddressClipboard.propTypes = {
  address: PropTypes.string.isRequired
};

export default AddressClipboard;
