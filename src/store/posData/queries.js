import gql from 'graphql-tag';
import Web3 from 'web3';
import apolloClient from '../../utils/apolloClient';

const posQuery = gql`
  {
    pos @client {
      address
      source
      error
    }
  }
`;

const updatePosAddressMutation = gql`
  mutation setPosAddress($address: String!, $error: String, $source: String!) {
    setPosAddress(address: $address, error: $error, source: $source) @client {
      address
      source
      error
    }
  }
`;

const updatePosAddress = (address, error, source) => {
  const web3 = new Web3();

  apolloClient.mutate({
    mutation: updatePosAddressMutation,
    variables: {
      source,
      address: web3.utils.isAddress(address) ? address : null,
      error:
        address && !web3.utils.isAddress(address)
          ? 'Provided Address is not a valid ethereum address'
          : error
    }
  });
};

const fetchPosData = () => {
  return apolloClient.watchQuery({ query: posQuery });
};

export { fetchPosData, updatePosAddress, posQuery };
