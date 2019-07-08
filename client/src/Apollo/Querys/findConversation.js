import client from '../Apollo'
import gql from "graphql-tag";


const query =  gql`
  query ($conversationInput: findMessageInput) {
    findConversation(conversationInput: $conversationInput){
    _id
    }
  }
  `


const findConversation = async ( _id, service )=> {

  const {data} = await client.query({
    query,
    variables: { conversationInput : { _id, service }}
  })
  return data.findConversation ? data.findConversation._id : false
}


export default findConversation;