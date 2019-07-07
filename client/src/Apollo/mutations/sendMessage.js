import client from '../Apollo'
import gql from "graphql-tag";






const sendMessageCustomereSchema=  gql`
mutation($customerName: String) {
    createCustomer(customerName: $customerName){
     _id 
    }
}
`


const sendMessageServicePersonSchema=  gql`
mutation($customerName: String) {
    createCustomer(customerName: $customerName){
     _id 
    }
}
`



const sendMessage = async (customerId, content, userId  ,service)=> {

    service = false
    content = "from react"
    const variables = {input : { customerId, content, authorId: userId } }     
    const mutation  = service ? sendMessageServicePersonSchema : sendMessageCustomereSchema
    
    const {data} = await client.mutate({
        mutation,
        variables
    })
//   alert(data)
    alert(data)
  return 
}

sendMessage('ass', 'skjnkjnoj', 'agggg' )




export default sendMessage;