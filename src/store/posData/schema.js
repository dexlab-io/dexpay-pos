const typeDefs = `
  type PosData {
    address: String!
    error: String
    source: String
  }

  type Query {
      pos: PosData!
  }

  type Mutation {
    setPosAddress(address: String!, error: String, source: String!): PosData!
  }
`;

export default typeDefs;
