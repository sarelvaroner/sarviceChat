const { gql } = require('apollo-server');


const typeDefs = gql`

  type servicePerson{
    _id: String,  
    servicePersonName: String,    
  }


  type customer {
    _id: String,
    customerName: String,
  }
  

  type message{
    content: String,
    userId: String,
    createdAt: String,   
    service: Boolean,
  }

  
  input messageInput {
    _id: String,
    content: String,
    userId: String,
    service: Boolean,
  }


  type conversation {
    _id: String,
    customerId: String,
    servicePersonId: String,
    messages: [message],
    resolved: Boolean,
    createdAt: String,
    updatedAt: String,
  }


  input findMessageInput{
    _id: String,
    service: Boolean,
  }
  
  input conversationinput{
    customerId: String,
    servicePersonId: String,
  }


  type Query {
    findConversation( conversationInput: findMessageInput): conversation
    importMessages( _id: String): [message]
    findAvailableServicePerson(_id: String):servicePerson
    findAvailbleCustomer(_id: String):customer
  }


  type Mutation {
    addCustumerToQueue(customerName: String): customer
    sendMessage( newMessage: messageInput ): message
    archiveConversation(_id: String): conversation
    addNewConversation(newConversation:conversationinput ): conversation
    resolvedConversation(_id: String):conversation
    removeCustomerFromQueue(_id: String ): customer
    ServicePersonMakeBuisy(_id: String):servicePerson
    ServicePersonMakeAvailable(_id: String):servicePerson
    createServicePerson(servicePersonName: String): servicePerson
  }
`;




module.exports = typeDefs













// sendMessage(input: messageInput): content
