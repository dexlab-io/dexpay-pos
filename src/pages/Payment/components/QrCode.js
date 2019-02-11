import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

  genQrCode(total) {
    const payload = this.getQrData(total);
    return `http://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=${escape(
      payload
    )}&qzone=1&margin=0&size=250x250&ecc=L`;
  }

  render() {
    const { valueCrypto } = this.props;
    const qrImage = this.genQrCode(valueCrypto);

    return (
      <Container>
        {qrImage ? <img src={qrImage} alt="Qr code payment" /> : null}
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
