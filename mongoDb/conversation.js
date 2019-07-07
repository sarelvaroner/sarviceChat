const mongoose = require('mongoose')
const schema = mongoose.Schema


const message = new schema({
    content: String,
    authorId: String,    
    },
    { collection: 'conversations' ,upsert :true, timestamps:true }
)
                                                    

const conversationSchema = new schema({
    customerId: String,
    servicePersonId: String,
    messages: [message],
    resolved: { type :Boolean, default: false}  
    },
    {collection: 'conversations' ,upsert :true, timestamps:true }
)




module.exports =  conversationSchema



    

  
 
    
    
  
  
  
  
  
  
  
    
    