import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import config from '../../../config';

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

class QrCode extends React.Component {
  state = {
    qrImage: null
  };

  componentDidMount() {
    const { valueCrypto } = this.props;

    this.genQrCode(valueCrypto);
  }

  getQrData(to, value) {
    return `ethereum:${to}?amount=${value}`;
  }

  genQrCode(total) {
    // console.log('Total', total);
    const payload = this.getQrData(config.posAddress, total);
    const qrImgUrl = `http://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=${escape(
      payload
    )}&qzone=1&margin=0&size=250x250&ecc=L`;
    this.setState({
      qrImage: qrImgUrl
    });
  }

  render() {
    const { qrImage } = this.state;

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
