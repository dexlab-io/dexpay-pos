import React, { Component } from 'react';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Keypad from '../../components/Keypad';

class Dashboard extends Component {
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
        <div className="section">
          <div className="container is-fluid">
            <Keypad onPay={total => this.onPay(total)} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default Dashboard;
