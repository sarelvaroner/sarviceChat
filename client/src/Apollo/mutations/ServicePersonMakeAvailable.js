import client from '../Apollo'
import gql from "graphql-tag";


const mutation=  gql`
mutation($_id: String) {
    ServicePersonMakeAvailable(_id: $_id){
        _id
    }
}
`

const ServicePersonMakeAvailable = async ( _id )=> {
    
    const {data} = await client.mutate({
        mutation,
        variables: { _id }
    })
    
  return data
}


export default ServicePersonMakeAvailable;

