import client from '../Apollo'
import gql from "graphql-tag";


const mutation=  gql`
mutation($newMessage: messageInput) {
    sendMessage(newMessage: $newMessage){
        content

    }
}
`

const sendMessageMutation = async (conversationId, content, userId ,service)=> {
    
    const {data} = await client.mutate({
        mutation,
        variables: { newMessage : { _id : conversationId, content, userId, service }}
    })
    
  return data
}


export default sendMessageMutation;

