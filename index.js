import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type School {
    name: String
    principal: String
  }

  type Country {
    name: String
    population: Int
    area: Float
  }

  type CombinedData {
    books: [Book]
    schools: [School]
    countries: [Country]
  }

  type Query {
    getAllData: CombinedData
    books: [Book]
    schools: [School]
    countries: [Country]
  }
`;

const books = [
  { title: 'The Awakening', author: 'Kate Chopin' },
  { title: 'City of Glass', author: 'Paul Auster' },
];

const schools = [
  { name: 'Gatero Girls High School', principal: 'James Muchiri' },
  { name: 'Nanyuki High School', principal: 'Oliver Minishi' },
];

const countries = [
  { name: 'Kenya', population: 50_000_000, area: 580_367 },
  { name: 'Uganda', population: 45_000_000, area: 241_038 },
];

const resolvers = {
  Query: {
    getAllData: () => ({
      books,
      schools,
      countries
    }),
    books: () => books,
    schools: () => schools,
    countries: () => countries
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`🚀  Server ready at: ${url}`);