import React, { Component } from 'react';
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, } from 'reactstrap';
import classnames from 'classnames';
import Keypad from '../../components/Keypad'

class POS extends Component {

    state = {
        activeTab: '1'
    }

    componentDidMount() {
        this.onPay = this.onPay.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
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
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                            >
                            Number Pad
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                            >
                            Recent payments
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <Keypad onPay={(total) => this.onPay(total)}/>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>

            <div>
                
            </div>
          </Container>
        );
    }
}

export default POS;