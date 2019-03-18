import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { QRCode } from 'react-qrcode-logo';
import { store } from '../../../store';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;

class QrCode extends React.Component {
  state = {
    address: null,
    noValue: false,
  };

  componentDidMount() {
    store.fetch.pos().subscribe(res => {
      this.setState({ address: res.data.pos.address });
    });
    if(this.props.noValue) {
      this.setState({ noValue: this.props.noValue });
    }
  }

  getQrData(value) {
    const { address } = this.state;
    if(this.state.noValue) {
      return `ethereum:${address}@100`;
    }
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
  valueCrypto: PropTypes.string.isRequired,
  noValue: PropTypes.bool,
};

export default QrCode;
