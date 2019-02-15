const typeDefs = `
  type Query {
    currency: String!
    acceptedTokens: [String!]
    requiredConfirmations: Int!
    walletAddress: String!
  }

  type Mutation {
    updateCurrency(currency: String!): String!
    toggleAcceptedTokens(token: String!, isAccepted: Boolean!): [String!]
    updateRequiredConfirmations(confirmation: Int!): Int!
    updateWalletAddress(address: String!): String!
  }
`;

export default typeDefs;
