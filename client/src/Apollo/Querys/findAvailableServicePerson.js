import client from '../Apollo'
import gql from "graphql-tag";



const query=  gql`
query($_id: String) {
    findAvailableServicePerson(_id: $_id){
     _id 
    }
}
`


const findAvailableServicePerson = async (customerName)=> {
         
    const {data} = await client.query({
        query,
        variables:{ customerName }
    })
    
  return data.findAvailableServicePerson ? data.findAvailableServicePerson._id : false
}


export default findAvailableServicePerson;

