import React, { Component } from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import CryptoAmount from './components/CryptoAmount';
import FiatAmount from './components/FiatAmount';
import AddTip from './components/AddTip';
import QrCode from './components/QrCode';
import { Divider } from '../../components/elements';
import WatcherTx from '../../class/WatcherTx';
import { getTokenPrice } from '../../utils/Coingecko';

const Container = styled.div``;
const Row = styled.div``;
const Col = styled.div``;

const posAddress = '0xB599Ac9d4892f44fEAc6bec3314Ef58432Ae3c79';
class Payment extends Component {
  state = {
    qrImage: null,
    value: null,
    txState: null,
    fiatPrices: null
  };

  async componentDidMount() {
    const { location } = this.props;
    const prices = await getTokenPrice();
    const valueFiat = location.state.total;
    const valueCrypto = parseFloat(valueFiat) / parseFloat(prices.usd);

    // console.log('valueFiat', valueFiat);

    this.setState({
      value: valueCrypto,
      valueFiat,
      txState: WatcherTx.STATES.PENDING,
      fiatPrices: prices
    });

    this.genQrCode(valueCrypto);
    const watcher = new WatcherTx();
    watcher.etherTransfers(posAddress, valueCrypto, data => {
      this.setState({
        txState: data.state,
        txHash: data.txHash
      });
    });
  }

  getQrData(to, value) {
    return `ethereum:${to}?amount=${value}`;
  }

  genQrCode(total) {
    console.log('Total', total);
    const payload = this.getQrData(posAddress, total);
    const qrImgUrl = `http://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=${escape(
      payload
    )}&qzone=1&margin=0&size=250x250&ecc=L`;
    this.setState({
      qrImage: qrImgUrl
    });
  }

  renderOld() {
    const { value, txState, txHash, valueFiat } = this.state;

    return (
      <Layout>
        <Seo title="POS" description="POS System" />
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              {this.state.qrImage ? (
                <img alt="Qr code payment" src={this.state.qrImage} />
              ) : null}
            </Col>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              {txState === WatcherTx.STATES.PENDING
                ? `Waiting for payment ${value.toPrecision(
                    2
                  )} ETH / ${valueFiat}$ at address ${posAddress}`
                : null}
              {txState === WatcherTx.STATES.DETECTED
                ? `Payment detected, waiting for confirmation.`
                : null}
              {txState === WatcherTx.STATES.CONFIRMED ? (
                <div>
                  Payment confirmed 🎊.{' '}
                  <a href="https://ropsten.etherscan.io/tx/${txHash}">
                    {' '}
                    Verify tx{' '}
                  </a>
                </div>
              ) : null}
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }

  render() {
    return (
      <Layout header={{ leftIcon: 'back', title: '1/3 Awaiting Payment' }}>
        <Seo
          title="Awaiting payment"
          description="Awaiting payment for transection"
        />
        <section className="section">
          <div className="container is-fluid">
            <CryptoAmount fiatAmount={10} />
            <FiatAmount fiatAmount={10} />
            <Divider isDotted />
            <AddTip />
            <QrCode />
          </div>
        </section>
      </Layout>
    );
  }
}

export default Payment;
