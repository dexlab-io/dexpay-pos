import gql from 'graphql-tag';
import apolloClient from '../../utils/apolloClient';

const invoicesQuery = gql`
  {
    invoices @client {
      recipient
      paid
      broadcasted
      confirmations
      txHash
    }
  }
`;

const fetchInvoices = () => {
  return apolloClient.watchQuery({ query: invoicesQuery });
};

export { fetchInvoices, invoicesQuery };
