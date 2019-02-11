const resolvers = {
  Mutation: {
    setPosAddress: (_, variables, { cache }) => {
      const data = {
        __typename: 'pos',
        address: variables.address,
        error: variables.error,
        source: variables.source,
        pos: {
          address: variables.address,
          error: variables.error,
          source: variables.source,
          __typename: 'pos'
        }
      };

      cache.writeData({ data });
      return data;
    }
  }
};

export default resolvers;
