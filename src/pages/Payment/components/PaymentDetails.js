import React from 'react';
import { Query } from 'react-apollo';
import { store } from '../../../store';
import CryptoAmount from './CryptoAmount';
import FiatAmount from './FiatAmount';
import AddTip from './AddTip';
import QrCode from './QrCode';
import AddressClipboard from './AddressClipboard';
import NetworkStatus from './NetworkStatus';
import InProgressBlocks from './InProgressBlocks';
import { Divider } from '../../../components/elements';

const PaymentDetails = props => {
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

      <Query query={store.queries.pos} fetchPolicy="cache">
        {({ data }) => (
          <AddressClipboard
            address={data.pos.address ? data.pos.address : data.pos.error}
          />
        )}
      </Query>

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
