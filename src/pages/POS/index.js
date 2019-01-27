import React, { Component } from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Keypad from '../../components/Keypad';

const Container = styled.div``;
const Row = styled.div``;
const Col = styled.div``;

class POS extends Component {
  state = {};

  componentDidMount() {
    this.onPay = this.onPay.bind(this);
  }

  onPay(total) {
    console.log('Total', total);
    this.props.history.push('/payment', { total });
  }

  render() {
    return (
      <Layout>
        <Seo title="POS" description="POS System" />
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Keypad onPay={total => this.onPay(total)} />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default POS;
