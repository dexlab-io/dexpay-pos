import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { QRCode } from 'react-qrcode-logo';
import logo from '../../../assets/images/logo.png';
import { store } from '../../../store';

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

class QrCode extends React.Component {
  state = {
    address: null
  };

  componentDidMount() {
    store.fetch.pos().subscribe(res => {
      this.setState({ address: res.data.pos.address });
    });
  }

  getQrData(value) {
    const { address } = this.state;
    return `ethereum:${address}?amount=${value}`;
  }

  render() {
    const { valueCrypto } = this.props;
    const qrPayload = this.getQrData(valueCrypto);

    return (
      <Container>
        <QRCode
          value={escape(qrPayload)}
          // logoImage={logo}
          padding={5}
          size={250}
        />
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
