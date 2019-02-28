const typeDefs = `
  type Confirmation {
    token: String!
    confirmations: Int!
  }

  type Query {
    currency: String!
    acceptedTokens: [String!]
    requiredConfirmations: [Confirmation!]
    walletAddress: String!
  }

  type Mutation {
    updateCurrency(currency: String!): String!
    toggleAcceptedTokens(token: String!, isAccepted: Boolean!): [String!]
    updateRequiredConfirmations(token: String!, confirmations: Int!): Confirmation!
    updateWalletAddress(address: String!): String!
  }
`;

export default typeDefs;
