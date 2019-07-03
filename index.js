require('dotenv').config()
const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const typeDefs = require('./GraphQL/shemaGql')
const resolvers = require('./GraphQL/resolvers')
const PORT = process.env.PORT || 4000


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new ApolloServer({ schema });


server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});