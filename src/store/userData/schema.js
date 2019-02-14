const typeDefs = `
  type User {
    id: ID!
    fullName: String
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

  type Mutation {
    toggleOnline(isOnline: Boolean!): Boolean
    toggleLoggedIn(isLoggedIn: Boolean!): Boolean
    login(input: LoginInput): User
    logout: Boolean!
    updateCounter(number: Int!): Int
  }
`;

export default typeDefs;
