import client from '../Apollo'
import gql from "graphql-tag";


const mutation=  gql`
mutation($_id: String) {
    archiveConversation(_id: $_id){
        _id

    }
}
`


const archiveConversation = async ( conversationId )=> {
    
    const {data} = await client.mutate({
        mutation,
        variables: { _id : conversationId }
    })
    
  return data
}


export default archiveConversation;

