import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
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
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">To:</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control">
              <Input className="input" type="text" value={address} />
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

AddressClipboard.propTypes = {
  address: PropTypes.string.isRequired
};

export default AddressClipboard;
