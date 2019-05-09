import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { WatcherTx } from 'eth-core-js';

// import WatcherTx from '../../../class/WatcherTx';
import AddTip from './AddTip';
import QrCode from './QrCode';
import CryptoAmount from '../../../components/CryptoAmount';
import FiatAmount from '../../../components/FiatAmount';
import AddressClipboard from '../../../components/AddressClipboard';
import NetworkStatus from './NetworkStatus';
import InProgressBlocks from './InProgressBlocks';
import dexLogo from '../../../assets/images/dex-logo-white.png';

const query = gql`
  {
    walletAddress @client
    requiredConfirmations @client {
      token
      confirmations
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 63px;
  background-color: #000;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.img`
  width: 127px;
  height: 24px;
`;

const FiatContainer = styled.div`
  padding: 10px 75px 0px 75px;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
  text-align: center;
  line-height: 1;
`;
const Title = styled.span``;

const PaymentInfo = styled.div`
  padding: 5px 75px;
`;

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
      addTipPayment,
      title,
      numConfirmations
    } = this.props;
    const { selectedCurrency } = this.state;
    const watchTx = new WatcherTx();

    return (
      <Container>
        <Header>
          <Logo src={dexLogo} alt="Dexpay logo" />
        </Header>
        {status === watchTx.STATES.PENDING && (
          <AddTip value={0} handleChange={addTipPayment} />
        )}
        <CryptoAmount
          cryptoCurrency={selectedCurrency}
          cryptoValue={valueCrypto}
          fiatAmount={parseFloat(valueFiat)}
          hasSelection={false}
          handleChange={option => {
            this.setState({ selectedCurrency: option.value });
          }}
        />
        <FiatContainer>
          <Title className="is-family-secondary">{title}</Title>
          <FiatAmount
            style={{ letterSpacing: '-0.2rem' }}
            fiatAmount={parseFloat(valueFiat) + tipValue}
          />
        </FiatContainer>
        {status === watchTx.STATES.PENDING && (
          <QrCode valueCrypto={valueCrypto[selectedCurrency]} />
        )}
        <Query query={query}>
          {({ data }) => (
            <React.Fragment>
              {status !== watchTx.STATES.PENDING && (
                <InProgressBlocks
                  status={status}
                  txHash={txHash}
                  requiredConfirmations={data.requiredConfirmations}
                  numConfirmations={numConfirmations}
                />
              )}
              <PaymentInfo>
                <AddressClipboard address={data.walletAddress} />
                {watchers ? (
                  <NetworkStatus
                    label={watchers.xdai.conf.label}
                    status={
                      watchers.xdai.isConnected()
                        ? 'connected'
                        : 'not connected'
                    }
                  />
                ) : null}
              </PaymentInfo>
            </React.Fragment>
          )}
        </Query>
      </Container>
    );
  }
}

export default PaymentDetails;
