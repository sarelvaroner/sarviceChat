import React, { Component } from 'react';
import client from './Apollo/Apollo'
import { ApolloProvider, Mutation, graphql  } from 'react-apollo';
import './App.css';
import Chat from './components/Chat/Chat'




class App extends Component {
  render (){
    return (
      <ApolloProvider client={client}>  
        <Chat></Chat>
    </ApolloProvider>
    )
  }
}



export default App  ;



