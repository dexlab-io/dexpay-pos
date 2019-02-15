const typeDefs = `
  type Query {
    currency: String!
    acceptedTokens: [String!]
    requiredConfirmations: Int!
  }

  type Mutation {
    updateCurrency(currency: String!): String!
    toggleAcceptedTokens(token: String!, isAccepted: Boolean!): [String!]
    updateRequiredConfirmations(confirmation: Int!): Int!
  }
`;

export default typeDefs;
