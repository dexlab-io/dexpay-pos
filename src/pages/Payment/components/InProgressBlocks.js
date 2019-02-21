/* eslint jsx-a11y/accessible-emoji: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Trans } from 'react-i18next';

import loadingImg from '../../../assets/images/loading.gif';
import checkImg from '../../../assets/images/checkmark.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px 75px;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
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

const InProgressBlocks = ({ blocksCount, status, txHash }) => {
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
      <div>
        <Trans>Blocks Verified</Trans>
      </div>
      <a
        href={`https://blockscout.com/poa/dai/tx/${txHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="has-text-weight-semibold"
      >
        <Trans>Open Block Explorer</Trans> <span role="img">🔗</span>
      </a>
    </Container>
  );
};

InProgressBlocks.propTypes = {
  blocksCount: PropTypes.number.isRequired,
  status: PropTypes.string
};

InProgressBlocks.defaultProps = {
  status: 'pending'
};

export default InProgressBlocks;
