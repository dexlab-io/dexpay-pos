const typeDefs = `
  type PosData {
    address: String!
  }

  type Query {
      pos: PosData!
  }

  type Mutation {
    setPosAddress(address: String!): PosData!
  }
`;

export default typeDefs;
