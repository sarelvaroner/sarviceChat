import client from '../Apollo'
import gql from "graphql-tag";


const mutation=  gql`
mutation($_id: String) {
    removeCustomerFromQueue(_id: $_id){
     _id 
    }
}
`


const removeCustomerFromQueue = async ( userId )=> {
         
    const {data} = await client.mutate({
        mutation,
        variables:{ _id : userId }
    })
  return data
}


export default removeCustomerFromQueue;