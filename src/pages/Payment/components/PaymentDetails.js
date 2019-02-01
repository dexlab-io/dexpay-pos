import React from 'react';

import CryptoAmount from './CryptoAmount';
import FiatAmount from './FiatAmount';
import AddTip from './AddTip';
import QrCode from './QrCode';
import AddressClipboard from './AddressClipboard';
import NetworkStatus from './NetworkStatus';
import InProgressBlocks from './InProgressBlocks';
import { Divider } from '../../../components/elements';
import config from '../../../config';

const PaymentDetails = props => {
  const { posAddress } = config;
  const {
    valueCrypto,
    valueFiat,
    txHash,
    tipValue,
    watchers,
    status,
    addTipPayment
  } = props;

  return (
    <React.Fragment>
      <CryptoAmount
        cryptoCurrency="ETH"
        cryptoValue={valueCrypto}
        fiatAmount={parseFloat(valueFiat)}
        hasSelection={status === 'pending'}
        handleChange={option => console.log('currency changed', option)}
      />
      <FiatAmount fiatAmount={parseFloat(valueFiat) + tipValue} />
      {status !== 'pending' && <Divider isDotted />}
      {status === 'pending' && (
        <AddTip value={0} handleChange={addTipPayment} />
      )}
      {status === 'pending' && <QrCode valueCrypto={valueCrypto.eth} />}
      {status !== 'pending' && (
        <InProgressBlocks blocksCount={14} status={status} txHash={txHash} />
      )}
      <AddressClipboard address={posAddress} />

      {watchers ? (
        <NetworkStatus
          label={watchers.xdai.conf.label}
          status={watchers.xdai.isConnected() ? 'connected' : 'not connected'}
        />
      ) : null}
    </React.Fragment>
  );
};

export default PaymentDetails;
