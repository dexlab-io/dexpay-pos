const typeDefs = `
  type Invoice {
    recipient: String!
    paid: Boolean!
    broadcasted: Boolean!
    confirmations: Int!
    txHash: String!
  }

  type Query {
    invoices: [Invoice]
  }
`;

export default typeDefs;
