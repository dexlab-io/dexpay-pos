import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import WatcherTx from '../../class/WatcherTx';
import { getTokenPrice } from '../../utils/Coingecko';

const posAddress = '0xB599Ac9d4892f44fEAc6bec3314Ef58432Ae3c79';
class Payment extends Component {

    state = {
        qrImage: null,
        value: null,
        txState: null,
        fiatPrices: null,
    }

    async componentDidMount() {
        const prices = await getTokenPrice();
        const valueFiat = this.props.location.state.total;
        const valueCrypto = parseFloat(valueFiat) / parseFloat(prices.usd);

        console.log('valueFiat', valueFiat)

        this.setState({
            value: valueCrypto,
            valueFiat,
            txState: WatcherTx.STATES.PENDING,
            fiatPrices: prices
        })

        this.genQrCode(valueCrypto);
        const watcher = new WatcherTx();
        watcher.etherTransfers(posAddress, valueCrypto, (data) => {
            this.setState({
                txState: data.state,
                txHash: data.txHash
            });
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
        const {value, txState, txHash, valueFiat} = this.state;
        return (
          <Container>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    { this.state.qrImage ? <img alt='Qr code payment' src={this.state.qrImage}/> : null }
                </Col>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    { txState === WatcherTx.STATES.PENDING ? `Waiting for payment ${value.toPrecision(2)} ETH / ${valueFiat}$ at address ${posAddress}` : null}
                    { txState === WatcherTx.STATES.DETECTED ? `Payment detected, waiting for confirmation.` : null}
                    { txState === WatcherTx.STATES.CONFIRMED ? 
                        <div>
                            Payment confirmed 🎊. <a href='https://ropsten.etherscan.io/tx/${txHash}' > Verify tx </a>
                        </div> : null}
                </Col>
            </Row>
          </Container>
        );
    }
}

export default Payment;