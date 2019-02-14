const typeDefs = `
  type User {
    id: ID!
    fullName: String
    shopName: String
    email: String!
  }

  type Query {
    user: User
    isOnline: Boolean!
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
    toggleOnline(isOnline: Boolean!): Boolean
    toggleLoggedIn(isLoggedIn: Boolean!): Boolean
    login(input: LoginInput): User
    logout: Boolean!
    updateCounter(number: Int!): Int
    updateUser(input: UserInput!): User
  }
`;

export default typeDefs;
