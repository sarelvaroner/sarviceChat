const mongoose            = require('mongoose')
const servicePersonSchema = require('../mongoDb/servisPerson')
const customerSchema      = require('../mongoDb/customer')
const conversationSchema  = require('../mongoDb/conversation')


const resolvers = {
    Query: {

      importConversation : async ( obj, { customerId }) => {
        const result = await mongoose.model('importConversation', conversationSchema).find({customerId, resolved: false})
        return result[0].messages
      },

      findAvailbleServicePerson: async() =>{
        const result = await mongoose.model('service', servicePersonSchema).find({ available:true }).sort({ createdAt: 1 })
        console.log(result);
        return result    
      },

      findAvailbleCustomer: async() =>{
        const result = await mongoose.model('findAvailbleCustomer', customerSchema).find({}).sort({createdAt: 1})
        console.log(result[0] )
        return result[0]    
      }
      
    },
    
    
    Mutation: {
      addNewConversation : async (obj, {customerId, content, authorId, servicePersonId}) => {
        console.log(customerId, content, authorId, servicePersonId)
   
        const openConversation = await mongoose.model('addNewConversation', conversationSchema).find({customerId, resolved: false})
        console.log(openConversation)
   
        if (!openConversation || openConversation.length === 0){
      
          const newConversation =  new mongoose.model('addNewConversation', conversationSchema)({
            customerId,
            servicePersonId,
            messeges:[{ content: 'you are connected to chat', authorId: "sistem message" }],
            resolved: false         
          })
          newConversation.save((err, cust) => { if ( err ) return console.error( err ) })


        }
        await mongoose.model('addNewConversation', conversationSchema).find({customerId, resolved: false}).update({ $push: { messages: { content, authorId }}})
        
      },
   
      createServicePerson : async (obj, {servicePersonName}) => {
        console.log('server')       
        return await mongoose.model('createServicePerson', servicePersonSchema).create({servicePersonName})
      },

      ServicePersonMakeBuisy : async(obj, {_id}) => {   
        return await mongoose.model('ServicePersonMakeBuisy', servicePersonSchema).findOneAndUpdate({_id},{available:false})        
      },

      ServicePersonMakeAvailable : async (obj, {_id}) => {   
        return await mongoose.model('ServicePersonMakeBuisy', servicePersonSchema).findOneAndUpdate({_id},{available:true})        
      },
      // done
      addCustumerToQueue : async(obj, {customerName}) => {
        return await mongoose.model('addCustumerToQueue', customerSchema).create({customerName})
      },
      // done
      removeCustomerFromQueue : async(obj, { _id }) => {
        return await mongoose.model('removeCustomerFromQueue', customerSchema).findOneAndRemove({ _id })        
      },
            
      // done
      sendMessage : async (obj , { newMessage }) => {
        const {  conversationId, content, userId, service } = newMessage
        return await mongoose.model('sendMessage', conversationSchema).find({conversationId, resolved: false}).update({ $push: { messages: { content, userId, service }}})
      },
        // done
        archiveConversation : async (obj, { _id }) => { 
        console.log(_id , 'server')
        const result =  await mongoose.model('archiveConversation', conversationSchema).findOneAndUpdate({_id},{resolved :true})
        mongoose.connection.close()
        return result
      }
    }
  };

  module.exports = resolvers


  
