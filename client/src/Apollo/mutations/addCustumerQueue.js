import client from '../Apollo'
import gql from "graphql-tag";


const mutation=  gql`
mutation($customerName: String) {
    addCustumerToQueue(customerName: $customerName){
     _id 
    }
}
`


const addCustumerToQueue = async (customerName)=> {
         
    const {data} = await client.mutate({
        mutation,
        variables:{ customerName }
    })

  return data.addCustumerToQueue._id
}


export default addCustumerToQueue;