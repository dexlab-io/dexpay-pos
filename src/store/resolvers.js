import gql from 'graphql-tag';

const resolvers = {
  Query: {
    isLoggedIn: async (_, variables, { cache }) => {
      const query = gql`
        query IsLoggedIn {
          isLoggedIn @client
        }
      `;
      const data = cache.readQuery({ query });

      return data.isLoggedIn;
    }
  },
  Mutation: {
    toggleOnline: (_, variables, { cache }) => {
      const { isOnline } = variables.input;
      // console.log('toggleIsLoggedIn', isLoggedIn);
      const data = {
        isOnline
      };
      // update local store
      cache.writeData({ data });
      return isOnline;
    },
    toggleLoggedIn: (_, variables, { cache }) => {
      const { isLoggedIn } = variables.input;
      const data = {
        isLoggedIn
      };
      // update local store
      cache.writeData({ data });
      return isLoggedIn;
    }
  }
};

export default resolvers;
