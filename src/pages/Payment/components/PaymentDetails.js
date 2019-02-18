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

class PaymentDetails extends React.Component {
  state = {
    selectedCurrency: 'dai'
  };

  render() {
    const {
      valueCrypto,
      valueFiat,
      txHash,
      tipValue,
      watchers,
      status,
      addTipPayment
    } = this.props;
    const { selectedCurrency } = this.state;

    return (
      <React.Fragment>
        <CryptoAmount
          cryptoCurrency={selectedCurrency}
          cryptoValue={valueCrypto}
          fiatAmount={parseFloat(valueFiat)}
          hasSelection={status === 'pending'}
          handleChange={option => {
            this.setState({ selectedCurrency: option.value });
          }}
        />
        <FiatAmount fiatAmount={parseFloat(valueFiat) + tipValue} />
        {status !== 'pending' && <Divider isDotted />}
        {status === 'pending' && (
          <AddTip value={0} handleChange={addTipPayment} />
        )}
        {status === 'pending' && (
          <QrCode valueCrypto={valueCrypto[selectedCurrency]} />
        )}
        {status !== 'pending' && (
          <InProgressBlocks blocksCount={14} status={status} txHash={txHash} />
        )}

        <Query query={store.queries.pos} fetchPolicy="cache">
          {({ data }) => (
            <div>
              <AddressClipboard
                address={data.pos.address ? data.pos.address : data.pos.error}
              />
              {watchers ? (
                <NetworkStatus
                  label={watchers.xdai.conf.label}
                  status={
                    watchers.xdai.isConnected() ? 'connected' : 'not connected'
                  }
                />
              ) : null}
              {/* <button
                type="button"
                className="button is-black is-uppercase is-large is-fullwidth"
                href={`ethereum:${data.pos.address}?amount=${
                  valueCrypto[selectedCurrency]
                }`}
              >
                Open in wallet
              </button> */}
            </div>
          )}
        </Query>
      </React.Fragment>
    );
  }
}

export default PaymentDetails;
