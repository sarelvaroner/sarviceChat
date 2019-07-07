import ApolloClient from 'apollo-boost';





const client = new ApolloClient ({
    uri: 'http://localhost:5000/graphql/',
    onError: (e) => { console.log(e) }
  })
  


export default client