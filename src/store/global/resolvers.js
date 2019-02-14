const resolvers = {
  Mutation: {
    updateCurrency: (_, variables, { cache }) => {
      // update cache
      cache.writeData({ data: { currency: variables.currency } });

      return variables.currency;
    }
  }
};

export default resolvers;
