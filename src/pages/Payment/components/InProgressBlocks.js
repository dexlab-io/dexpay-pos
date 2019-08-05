/* eslint jsx-a11y/accessible-emoji: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Trans } from 'react-i18next';
import { find } from 'lodash';
import { WatcherTx } from 'eth-dexcore-js';

import config from '../../../config';
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
  width: 120px;
  height: auto;
`;
const Count = styled.div`
  background-color: ${props =>
    props.confirmed ? props.theme.secondaryColor : '#000000'};
  color: ${props => (props.confirmed ? '#000000' : '#ffffff')};
  padding: 6px 12px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const InProgressBlocks = ({
  status,
  txHash,
  requiredConfirmations,
  numConfirmations
}) => {
  let selectedToken = find(requiredConfirmations, { token: 'xdai' });
  const watchTx = new WatcherTx();
  if (!selectedToken) {
    selectedToken = { confirmations: config.requiredConfirmations };
  }

  return (
    <Container>
      <div>
        {status === watchTx.STATES.DETECTED ||
          (status === watchTx.STATES.NEW_CONFIRMATION && (
            <LoadingImage src={loadingImg} alt="loading" />
          ))}
        {status === watchTx.STATES.CONFIRMED && (
          <CheckImage src={checkImg} alt="completed" />
        )}
      </div>
      <Count confirmed={numConfirmations === selectedToken.confirmations}>
        {numConfirmations}/{selectedToken.confirmations}
      </Count>
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

InProgressBlocks.defaultProps = {
  status: 'pending'
};

InProgressBlocks.propTypes = {
  requiredConfirmations: PropTypes.array.isRequired,
  status: PropTypes.string
};

export default InProgressBlocks;
