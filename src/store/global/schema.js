const typeDefs = `
  enum WalletAddressSource {
    web3js
    getQuery
    manualInput
  }

  type Confirmation {
    token: String!
    confirmations: Int!
  }

  type Query {
    currency: String!
    acceptedTokens: [String!]
    requiredConfirmations: [Confirmation!]
    walletAddress: String
    walletAddressSource: WalletAddressSource
  }

  type Mutation {
    initApp: Boolean!
    updateCurrency(currency: String!): String!
    toggleAcceptedTokens(token: String!, isAccepted: Boolean!): [String!]
    updateRequiredConfirmations(token: String!, confirmations: Int!): Confirmation!
    updateWalletAddress(address: String!, source: String): String!
  }
`;

export default typeDefs;
