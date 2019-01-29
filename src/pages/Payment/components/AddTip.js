import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div``;

const AddTip = ({ value }) => {
  return <Container>Add tip {value}</Container>;
};

AddTip.propTypes = {
  value: 0
};

AddTip.propTypes = {
  value: PropTypes.string.isRequired
};

export default AddTip;
