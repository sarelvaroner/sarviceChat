const { gql } = require('apollo-server');


const typeDefs = gql`

  type servicePerson{
    _id: String,  
    servicePersonName: String,    
  }


  input inputServicePerson{
    _id: String,  
    servicePersonName: String,

  }


  input customerNameInput{
    customerNameInput: String,

  }

  type customer {
    _id: String,
    customerName: String,
  }
  

  type message{
    content: String,
    timeStamp: String,
    authorId: String,
    createdAt: String,   
  }




  input messageInput {
    customerIdInput: String,
    contentInput: String,
    authorIdInput: String,
  }


  type conversation {
    _id: String,
    customerId: String,
    servicePersonId: String,
    messages: [message],
    resoled: Boolean, 
  }

  
  type Query { 
    importConversation(customerId: String): [message]
    findAvailbleServicePerson(_id: String):servicePerson
    findAvailbleCustomer(_id: String):customer
  }


  type Mutation {
    createCustomer(customerName: String): customer
    
    addNewConversation(customerId: String, content: String, authorId: String, servicePersonId: String): [message]





    
    resolvedConversation(_id: String):conversation

    removeCustomer(_id:String ): customer

    ServicePersonMakeBuisy(_id: String):servicePerson
    ServicePersonMakeAvailable(_id: String):servicePerson

    createServicePerson(servicePersonName: String): servicePerson


    
    


  }
`;




module.exports = typeDefs













// sendMessage(input: messageInput): content
