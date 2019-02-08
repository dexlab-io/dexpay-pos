import gql from 'graphql-tag';
import apolloClient from '../../utils/apolloClient';

const query = gql`
  {
    pos @client {
      address
    }
  }
`;

const updatePosAddressMutation = gql`
  mutation setPosAddress($address: String!) {
    setPosAddress(address: $address) @client {
      address
    }
  }
`;

const updatePosAddress = address => {
  apolloClient.mutate({
    mutation: updatePosAddressMutation,
    variables: { address }
  });
};

const fetchPosData = () => {
  return apolloClient.watchQuery({ query });
};

export { fetchPosData, updatePosAddress };
