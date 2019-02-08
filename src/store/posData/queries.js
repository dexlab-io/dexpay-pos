import gql from 'graphql-tag';
import Web3 from 'web3';
import apolloClient from '../../utils/apolloClient';

const query = gql`
  {
    pos @client {
      address
      error
    }
  }
`;

const updatePosAddressMutation = gql`
  mutation setPosAddress($address: String!, $error: String) {
    setPosAddress(address: $address, error: $error) @client {
      address
      error
    }
  }
`;

const updatePosAddress = (address, error) => {
  const web3 = new Web3();
  apolloClient.mutate({
    mutation: updatePosAddressMutation,
    variables: {
      address: web3.utils.isAddress(address) ? address : null,
      error:
        address && !web3.utils.isAddress(address)
          ? 'Provided Address is not a valid ethereum address'
          : error
    }
  });
};

const fetchPosData = () => {
  return apolloClient.watchQuery({ query });
};

export { fetchPosData, updatePosAddress };
