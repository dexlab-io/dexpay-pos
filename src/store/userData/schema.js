const typeDefs = `
  type User {
    id: ID!
    fullName: String
    shopName: String
    email: String!
  }

  type Query {
    user: User
    isLoggedIn: Boolean!
    counter: Int
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UserInput {
    shopName: String!
    email: String!
  }

  type Mutation {
    toggleLoggedIn(isLoggedIn: Boolean!): Boolean
    login(input: LoginInput): User
    logout: Boolean!
    updateUser(input: UserInput!): User
  }
`;

export default typeDefs;
