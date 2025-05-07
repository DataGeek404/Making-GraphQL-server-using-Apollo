const { ApolloServer, gql } = require('apollo-server');
const sequelize = require('./db'); // Your Sequelize instance
const User = require('./models/User'); // Sequelize model for 'users'

// ✅ GraphQL Schema Definition
const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
  }

  type Query {
    getUsers: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
`;

// ✅ Resolver Functions
const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.findAll();
    },
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      return await User.create({ name, email });
    },
  },
};

// ✅ Apollo Server Initialization
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// ✅ Connect to DB and Start Server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection established successfully.');

    // DO NOT sync if you're using an existing table
    // await sequelize.sync(); 

    const { url } = await server.listen({ port: 3000 });
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

startServer();
