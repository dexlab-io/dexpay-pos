const typeDefs = `
  type Query {
    currency: String
  }

  type Mutation {
    updateCurrency(currency: String!): String!
  }
`;

export default typeDefs;
