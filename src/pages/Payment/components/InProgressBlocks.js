import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import loadingImg from '../../../assets/images/loading.png';
import checkImg from '../../../assets/images/checkmark.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 80px 0;
`;
const LoadingImage = styled.img`
  width: 120px;
  height: 120px;
`;
const CheckImage = styled.img`
  width: 240px;
  height: auto;
`;
const Count = styled.div`
  background-color: ${props =>
    props.status === 'detected' ? '#000000' : props.theme.secondaryColor};
  color: ${props => (props.status === 'detected' ? '#ffffff' : '#000000')};
  padding: 6px 12px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const InProgressBlocks = ({ blocksCount, status }) => {
  return (
    <Container>
      <div>
        {status === 'detected' && (
          <LoadingImage src={loadingImg} alt="loading" />
        )}
        {status === 'confirmed' && (
          <CheckImage src={checkImg} alt="completed" />
        )}
      </div>
      <Count status={status}>{blocksCount}</Count>
      <div>Blocks Verified</div>
      <p className="has-text-weight-semibold">
        Open Block Explorer <span role="img">🔗</span>
      </p>
    </Container>
  );
};

InProgressBlocks.propTypes = {
  blocksCount: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired
};

export default InProgressBlocks;
