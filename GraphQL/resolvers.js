const db = require('../mongoDb/schemaMdb')

const resolvers = {
    Query: {
      conversation: async (obj,  { _id }) => {
        console.log("dddd")
        const results = await db.find({_id}).exec()      
        console.log(results[0])
        return results[0]
      }
     
    },
    
  
    mutation: {
      createMessage: async (obj, { content, timeStamp, authorId, authorName, authorType, _id }) => {
        const  newMessage = { content, timeStamp, authorId, authorName, authorType }
        await db.collection('conversations').update({ _id }, newMessage, upsert=True);     
      }     
    }
  };

  module.exports = resolvers