import client from '../Apollo'
import gql from "graphql-tag";


const mutation=  gql`
mutation($newConversation: conversationinput) {
    addNewConversation(newConversation: $newConversation){
        _id
    }
}
`



const addNewConversation = async ( customerId, servicePersonId )=> {
    
    const {data} = await client.mutate({
        mutation,
        variables: { newConversation: { customerId, servicePersonId }}
    })
    
  return data
}


export default addNewConversation;

