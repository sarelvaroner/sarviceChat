import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
// import { ApolloProvider, Mutation, graphql  } from 'react-apollo';

  
const addNewConversationSchema = gql`
mutation {
  addNewConversation(customerId: String, content: String, authorId: String, servicePersonId: String){
    content    
  }
}
`

const addNewConversation =  (customerId, authorId, content, servicePersonId) => {
  

  


alert(`openChatHandler  customerId: ${customerId} servicePersonId:${servicePersonId} content: ${content}  authorId: ${authorId} `   )

  
  return (
        <Mutation mutation={addNewConversationSchema} variables={{customerId, authorId, content, servicePersonId}}>
          {
            ({data})=> {
              console.log(data)
              alert("ssssss")
              return <h1>dsdsdsdsds</h1>

            }

          }
         
        </Mutation>

    )

}


export default addNewConversation
