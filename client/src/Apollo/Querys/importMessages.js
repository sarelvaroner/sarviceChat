import client from '../Apollo'
import gql from "graphql-tag";


const importmessagesBycustomerId =  gql`
query{
    importConversation(customerId:"a"){
      content
      authorId
      createdAt
      
    }
  }
`


const importmessagesByservicePersonId=  gql`
query{
  exemplebringallservicepersons(servicePersonName:""){
    _id    
  }
}
`


const importMessages = async (userId ,service)=> {
  service = false

  const variables = service ? {servicePersonId: userId}       : { customerId: userId }
  const query     = service ? importmessagesByservicePersonId : importmessagesBycustomerId

  const {data} = await client.query({
    query,
    variables
  })

  return data.importConversation
}


export default importMessages;