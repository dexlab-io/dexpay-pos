import React from 'react';
import swal from 'sweetalert';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import CreateInvoiceForm from './components/CreateInvoiceForm';

const query = gql`
  {
    invoices {
      id
      invoiceNumber
      fiatAmount
      fiatCurrency
    }
  }
`;

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
            <hr />
            <h2 className="title">Your Invoices</h2>
            <Query query={query} fetchPolicy="cache-and-network">
              {({ data, loading, error }) => {
                if (loading && !data.invoices) return <p>loading...</p>;
                if (error) return <p>Error: {error.message}</p>;
                // console.log('invoices', data.invoices);

                return (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Invoice ID</th>
                        <th>Currency</th>
                        <th>Amount</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {data.invoices.map(invoice => (
                        <tr key={invoice.id}>
                          <th>{invoice.invoiceNumber}</th>
                          <th>{invoice.fiatCurrency}</th>
                          <th>{invoice.fiatAmount}</th>
                          <th>
                            <Link
                              to={`/invoice/${invoice.invoiceNumber}`}
                              className="button is-small"
                            >
                              VIEW
                            </Link>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
              }}
            </Query>
          </div>
        </div>
      </Layout>
    );
  }
}

export default CreateInvoice;
