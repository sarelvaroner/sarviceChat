import client from '../Apollo'
import gql from "graphql-tag";


const addCustumerToQueueSchema=  gql`
mutation($customerName: String) {
    createCustomer(customerName: $customerName){
     _id 
    }
}
`


const addCustumerToQueue = async (customerName)=> {
         
    const {data} = await client.mutate({
        mutation: addCustumerToQueueSchema,
        variables:{customerName}
    })
  return data
}


export default addCustumerToQueue;