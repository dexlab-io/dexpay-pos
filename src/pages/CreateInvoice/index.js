import React from 'react';
import swal from 'sweetalert';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import CreateInvoiceForm from './components/CreateInvoiceForm';

const createInvoiceMutation = gql`
  mutation createInvoice($fiatAmount: Int!, $fiatCurrency: String!) {
    createInvoice(
      input: { fiatAmount: $fiatAmount, fiatCurrency: $fiatCurrency }
    ) {
      id
      invoiceNumber
      fiatAmount
      fiatCurrency
      store {
        name
        walletAddress
      }
    }
  }
`;

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

  onSuccess = (cache, { data: { createInvoice } }) => {
    const { history } = this.props;

    swal({
      icon: 'info',
      title: 'Invoice created',
      button: {
        text: 'Get URL'
      }
    }).then(() => {
      history.push(`/invoice/${createInvoice.invoiceNumber}`);
    });
  };

  render() {
    return (
      <Layout>
        <Seo title="Create Invoice" />
        <div className="section">
          <div className="container">
            <h2 className="title">Create Invoice</h2>
            <Mutation
              mutation={createInvoiceMutation}
              update={this.onSuccess}
              onError={error => {
                swal(
                  'Issue!',
                  error.message.replace('GraphQL error: ', ''),
                  'warning'
                );
              }}
            >
              {createInvoice => (
                <CreateInvoiceForm
                  handleSubmit={data => {
                    // console.log('login form', data);
                    createInvoice({
                      variables: data
                    });
                  }}
                />
              )}
            </Mutation>
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
