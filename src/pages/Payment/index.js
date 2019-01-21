import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import WatcherTx from '../../class/WatcherTx';

const posAddress = '0xB599Ac9d4892f44fEAc6bec3314Ef58432Ae3c79';
class Payment extends Component {

    state = {
        qrImage: null,
        value: null,
    }

    componentDidMount() {
        console.log('this.state', this.props.location.state)

        const total = this.props.location.state.total;

        this.setState({
            value: total,
        })

        this.genQrCode(total);
        const watcher = new WatcherTx();
        watcher.etherTransfers(posAddress, (data) => {
            console.log('cb data', data);
        })
    }

    getQrData(to, value) {
        return `ethereum:${to}?amount=${value}`
    }

    genQrCode(total) {
        console.log('Total', total)
        const payload = this.getQrData(posAddress, total);
        const qrImgUrl = `http://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=${escape(payload)}&qzone=1&margin=0&size=250x250&ecc=L`;
        this.setState(
            {
                qrImage: qrImgUrl
            }
        );
    }

    render() {
        const {value} = this.state;
        return (
          <Container>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    { this.state.qrImage ? <img alt='Qr code payment' src={this.state.qrImage}/> : null }
                </Col>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    Waiting for payment {value}ETH at address {posAddress}
                </Col>
            </Row>
          </Container>
        );
    }
}

export default Payment;