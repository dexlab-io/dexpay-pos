import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { QRCode } from 'react-qrcode-logo';
import gql from 'graphql-tag';

import apolloClient from '../../../utils/apolloClient';
// import { store } from '../../../store';

const query = gql`
  {
    walletAddress @client
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;

class QrCode extends React.Component {
  state = {
    address: null
  };

  componentDidMount() {
    apolloClient.watchQuery({ query }).subscribe(res => {
      this.setState({ address: res.data.walletAddress });
    });
  }

  getQrData(value) {
    const { address } = this.state;
    return `ethereum:${address}@100?value=${value}e18`;
  }

  render() {
    const { valueCrypto } = this.props;
    const qrPayload = this.getQrData(valueCrypto);

    return (
      <Container>
        <QRCode value={qrPayload} padding={5} size={230} />
      </Container>
    );
  }
}

QrCode.propTypes = {
  valueCrypto: '0'
};

QrCode.propTypes = {
  valueCrypto: PropTypes.string.isRequired
};

export default QrCode;
