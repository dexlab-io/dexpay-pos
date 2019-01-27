import React, { Component } from 'react';
import styled from 'styled-components';

import Keypad from '../../components/Keypad'

const Container = styled.div``;
const Row = styled.div``;
const Col = styled.div``;

class POS extends Component {

    state = {}

    componentDidMount() {
        this.onPay = this.onPay.bind(this);
    }

    onPay(total) {
        console.log('Total', total)
        this.props.history.push('/payment', { total });
    }

    render() {
        return (
          <Container>
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Keypad onPay={(total) => this.onPay(total)}/>
                </Col>
            </Row>
          </Container>
        );
    }
}

export default POS;