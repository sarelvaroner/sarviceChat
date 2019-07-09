import client from '../Apollo'
import gql from "graphql-tag";


const query =  gql`
  query ($_id: String) {
    importMessages(_id: $_id){
    content
    userId
    service
    createdAt

    }
  }
  `


const importMessages = async ( _id )=> {

  const {data} = await client.query({
    query,
    variables:{ _id }
  })
  return data.importMessages
}


export default importMessages;






