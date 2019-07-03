const { gql } = require('apollo-server');


const typeDefs = gql`
  type message{
    content   : String,
    timeStamp : String,
    authorId  : String,
    authorName: String,
    authorType: String,
  }
  
 
  type messages { 
    messages: [message] 
  }
  
  type Query { 
    conversation(_id: String): messages 
  }
  type mutation {
    createMessage(content: String,
    timeStamp  : String,
    authorId   : String,
    authorName : String,
    authorType : String,): message
   
  }
`;


module.exports = typeDefs