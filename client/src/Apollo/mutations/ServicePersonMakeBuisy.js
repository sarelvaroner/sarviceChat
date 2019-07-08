import client from '../Apollo'
import gql from "graphql-tag";


const mutation=  gql`
mutation($_id: String) {
    ServicePersonMakeBuisy(_id: $_id){
        _id
    }
}
`


const ServicePersonMakeBuisy = async ( _id )=> {
    
    const {data} = await client.mutate({
        mutation,
        variables: { _id }
    })
    
  return data
}


export default ServicePersonMakeBuisy;

