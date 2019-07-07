require('dotenv').config()
const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const typeDefs  = require('./GraphQL/typeDefs')
const resolvers = require('./GraphQL/resolvers')
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')


mongoose.connect(process.env.DB_URL_CONNECTION, {useNewUrlParser: true})
mongoose.connection.once('open', ()=> console.log('connect to mongoDb'))


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new ApolloServer({ schema, cors: true });


server.listen(PORT).then(({ url }) => {
  console.log(` Server ready at ${url}`);
});