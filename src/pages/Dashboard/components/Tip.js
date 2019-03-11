import React, { Component } from 'react';
import styled from 'styled-components';
import CryptoAmount from '../../Payment/components/CryptoAmount';
import QrCode from '../../Payment/components/QrCode';
import WatcherTx from '../../../class/WatcherTx';
import { Query } from 'react-apollo';
import { store } from '../../../store';
import AddressClipboard from '../../Payment/components/AddressClipboard';
import NetworkStatus from '../../Payment/components/NetworkStatus';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FiatContainer = styled.div`
  padding: 10px 75px 0px 75px;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
  text-align: center;
`;

const Title = styled.span``;

const PaymentInfo = styled.div`
  padding: 12px 75px;
`;

class Tip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posAddress: null,
      txState: null,
    };
  }

  startWatcher() {
    this.setState({ txState: WatcherTx.STATES.PENDING });
    this.tipWatcher = new WatcherTx(WatcherTx.NETWORKS.XDAI);
    this.tipWatcher.xdaiTransfer(this.state.posAddress, null, data => {
      this.setState({ txState: data.state});
      if (data.state === WatcherTx.STATES.CONFIRMED) {
        this.props.onTipReceived(data.txHash);
      }
    });
  }

  stopWatcher() {
    if(this.tipWatcher) {
      this.tipWatcher.pollingOn = false;
      this.setState({ txState: null });
    }
  }

  componentDidMount() {
    store.fetch.pos().subscribe(async result => {
      const posAddress = result.data.pos.address;
      this.setState({ posAddress });
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.active) {
      this.startWatcher();
    }
    else {
      this.stopWatcher();
    }
  }

  render() {
    const { txState } = this.state;
    let title = '';
    if (txState === WatcherTx.STATES.PENDING) {
      title = `1 / 3 Awaiting Payment`;
    } else if (txState === WatcherTx.STATES.DETECTED) {
      title = `2 / 3 Pending Payment`;
    } else if (txState === WatcherTx.STATES.CONFIRMED) {
      title = `3 / 3 Payment Successful`;
    }
    
    return this.props.active && (
      <Container>
        <CryptoAmount cryptoValue={{dai: ''}} />
        <FiatContainer>
          <Title className="is-family-secondary">{title}</Title>
        </FiatContainer>
        <QrCode valueCrypto="" noValue={true} />
        <Query query={store.queries.pos} fetchPolicy="cache">
          {({ data }) => (
            <PaymentInfo>
              <AddressClipboard
                address={data.pos.address ? data.pos.address : data.pos.error}
              />
              {this.tipWatcher ? (
                <NetworkStatus
                  label={this.tipWatcher.conf.label}
                  status={
                    this.tipWatcher.isConnected() ? 'connected' : 'not connected'
                  }
                />
              ) : null}
            </PaymentInfo>
          )}
        </Query>
      </Container>
    );
  };
};

export default Tip;
