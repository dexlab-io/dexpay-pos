import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Keypad from '../../components/Keypad'

class POS extends Component {

    onPay(total) {
        console.log('Total', total)
    }
    render() {
        return (
          <Container>
            <Row>
                <Col> POS </Col> 
            </Row>

            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Keypad onPay={this.onPay}/>
                </Col>
            </Row>
          </Container>
        );
    }
}

export default POS;