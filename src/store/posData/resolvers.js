const resolvers = {
  Mutation: {
    setPosAddress: (_, variables, { cache }) => {
      const data = {
        __typename: 'pos',
        address: variables.address,
        error: variables.error,
        pos: {
          address: variables.address,
          error: variables.error,
          __typename: 'pos'
        }
      };

      cache.writeData({ data });
      return data;
    }
  }
};

export default resolvers;
