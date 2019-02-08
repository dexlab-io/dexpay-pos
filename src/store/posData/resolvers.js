const resolvers = {
  Mutation: {
    setPosAddress: (_, variables, { cache }) => {
      console.log('variables', variables);
      const newState = {
        address: variables.address
      };

      cache.writeData({
        data: {
          pos: {
            address: variables.address,
            __typename: 'pos'
          }
        }
      });

      return newState;
    }
  }
};

export default resolvers;
