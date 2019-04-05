import React from 'react';
import swal from 'sweetalert';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import CreateInvoiceForm from './components/CreateInvoiceForm';

class CreateInvoice extends React.Component {
  constructor(props) {
    super(props);

    const token = window.localStorage.getItem('token');
    this.state = {
      isLoggedIn: !!token
    };
  }

  componentDidMount() {
    const { isLoggedIn } = this.state;
    const { history } = this.props;

    if (!isLoggedIn) {
      swal({
        icon: 'info',
        title: 'Please login to continue',
        button: {
          text: 'Login'
        }
      }).then(() => {
        history.push('/login');
      });
    }
  }

  render() {
    return (
      <Layout>
        <Seo title="Create Invoice" />
        <div className="section">
          <div className="container">
            <h2 className="title">Create Invoice</h2>
            <CreateInvoiceForm />
            <hr />
            <h2 className="title">Your Invoices</h2>
            <p>TODO: list invoice here</p>
          </div>
        </div>
      </Layout>
    );
  }
}

export default CreateInvoice;
