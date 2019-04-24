import React from 'react';
import swal from 'sweetalert';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import CreateInvoiceForm from './components/CreateInvoiceForm';

const createInvoiceMutation = gql`
  mutation createInvoice($fiatAmount: String!, $fiatCurrency: String!) {
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
  onSuccess = (cache, { data: { createInvoice } }) => {
    swal({
      icon: 'info',
      title: 'Invoice created',
      button: {
        text: 'Get URL'
      }
    }).then(() => {
      const win = window.open(
        `/invoice/${createInvoice.invoiceNumber}`,
        '_blank'
      );
      win.focus();
    });
  };

  render() {
    return (
      <Layout header={{ isVisible: false }}>
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
                  handleUpdate={data => {
                    // console.log('login form', data);
                    return createInvoice({
                      variables: {
                        fiatAmount: data.fiatAmount.toString(),
                        fiatCurrency: data.fiatCurrency
                      }
                    });
                  }}
                />
              )}
            </Mutation>
          </div>
        </div>
      </Layout>
    );
  }
}

export default CreateInvoice;
