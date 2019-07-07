import client from '../Apollo'
import gql from "graphql-tag";






const sendmessageservicePersonId=  gql`
mutation{
  exemplebringallservicepersons(servicePersonName:""){
    _id    
  }
}
`
const sendmessagecustomerId =  gql`
mutation sendMessage ($customerIdInput: String, $contentInput: String, $authorIdInput: String){
    
}
`


const sendMessage = async (customerId, content, userId  ,service)=> {



    service = false
    content = "from react"
    const variables = {input : { customerId, content, authorId: userId } }     
    const mutation  = service ? sendmessageservicePersonId : sendmessagecustomerId
    
    const {data} = await client.mutate({
        mutation,
        variables
    })
//   alert(data)
    alert('ddd')
  return 
}

sendMessage('ass', 'skjnkjnoj', 'agggg' )




export default sendMessage;