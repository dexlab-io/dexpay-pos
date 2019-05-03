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

  type FiatRates {
    currency: String!
    price: Int!
  }

  type ExchangeRates {
    token: String!
    fiat: [FiatRates]
  }

  input RequiredConfirmationsInput {
    token: String!
    confirmations: Int!
  }

  type Query {
    currency: String!
    acceptedTokens: [String!]
    requiredConfirmations: [Confirmation!]
    walletAddress: String
    walletAddressSource: WalletAddressSource
    exchangeRates: [ExchangeRates]
  }

  type Mutation {
    initApp: Boolean!
    updateCurrency(currency: String!): String!
    toggleAcceptedTokens(token: String!, isAccepted: Boolean!): [String!]
    updateAcceptedTokens(tokens: [String!]!): [String!]
    setRequiredConfirmations(requiredConfirmations: RequiredConfirmationsInput): [Confirmation!]
    updateRequiredConfirmations(token: String!, confirmations: Int!): Confirmation!
    updateWalletAddress(address: String!, source: String): String!
  }
`;

export default typeDefs;
