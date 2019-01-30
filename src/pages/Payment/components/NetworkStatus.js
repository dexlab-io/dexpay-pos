import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const Status = styled.span`
  background-color: ${props => props.theme.secondaryColor};
  padding: 3px 5px;
`;

const NetworkStatus = ({ status }) => {
  return (
    <Container>
      Ethereum Main Network{' '}
      <Status className="has-text-weight-bold">{status}</Status>
    </Container>
  );
};

NetworkStatus.propTypes = {
  status: PropTypes.string.isRequired
};

export default NetworkStatus;
