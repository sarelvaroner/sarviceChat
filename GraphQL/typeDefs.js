const { gql } = require('apollo-server');


const typeDefs = gql`



  type servicePerson{
    _id: String,  
    servicePersonName: String,    
  }


  input inpotservicePerson{
    _id: String,  
    servicePersonName: String,

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
    addNewConversation(customerId: String, content: String, authorId: String, servicePersonId: String): [message]
    sendMessage(input: messageInput): content
    
    resolvedConversation(_id: String):conversation

    createCustomer(customerName: String): customer
    removeCustomer(_id:String ): customer

    ServicePersonMakeBuisy(_id: String):servicePerson
    ServicePersonMakeAvailable(_id: String):servicePerson

    createServicePerson(servicePersonName: String): servicePerson


    
    


  }
`;




module.exports = typeDefs













