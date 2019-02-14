const typeDefs = `
  type Query {
    currency: String
    acceptedTokens: [String!]
  }

  type Mutation {
    updateCurrency(currency: String!): String!
    toggleAcceptedTokens(token: String!, isAccepted: Boolean!): [String!]
  }
`;

export default typeDefs;
