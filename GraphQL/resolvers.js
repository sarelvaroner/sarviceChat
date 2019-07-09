const mongoose            = require('mongoose')
const servicePersonSchema = require('../mongoDb/servisPerson')
const customerSchema      = require('../mongoDb/customer')
const conversationSchema  = require('../mongoDb/conversation')


const resolvers = {
    Query: {

      findConversation: async ( obj, { conversationInput }) => {
        const { _id , service } = conversationInput
        const pearms = service ? { servicePersonId: _id, resolved: false } : { customerId: _id, resolved: false }

        const result = await mongoose.model('findConversation', conversationSchema).find(pearms)
        return  result ? result[0] : false
      },

      importMessages : async ( obj, { _id }) => {
        const result = await mongoose.model('importMessages', conversationSchema).find({ _id , resolved: false})
        return result[0] ? result[0].messages : []
      },

      findAvailableServicePerson: async() =>{
        const result = await mongoose.model('findAvailableServicePerson', servicePersonSchema).find({ available : true }).sort({ createdAt: 1 })
        return result[0]    
      },

      findAvailbleCustomer: async() =>{
        const result = await mongoose.model('findAvailbleCustomer', customerSchema).find({}).sort({createdAt: 1})    
        return result[0]    
      }
      
    },
    
    
    Mutation: {
      addNewConversation : async (obj, { newConversation } ) => { 
        const {customerId, servicePersonId} = newConversation
        console.log(customerId, servicePersonId)
        newConversation =  new mongoose.model('addNewConversation', conversationSchema)({
          customerId,
          servicePersonId,
          messeges:[],
          resolved: false         
        })
        newConversation.save((err, cust) => { if ( err ) return console.error( err ) })
        return newConversation
      },
   
      createServicePerson : async (obj, {servicePersonName}) => {
        return await mongoose.model('createServicePerson', servicePersonSchema).create({servicePersonName})
      },

      ServicePersonMakeBuisy : async(obj, {_id}) => {   
        return await mongoose.model('ServicePersonMakeBuisy', servicePersonSchema).findOneAndUpdate({_id},{available:false})        
      },

      ServicePersonMakeAvailable : async (obj, {_id}) => {   
        return await mongoose.model('ServicePersonMakeAvailable', servicePersonSchema).findOneAndUpdate({_id},{available:true})        
      },
      addCustumerToQueue : async(obj, {customerName}) => {
        return await mongoose.model('addCustumerToQueue', customerSchema).create({customerName})
      },
      removeCustomerFromQueue : async(obj, { _id }) => {
        return await mongoose.model('removeCustomerFromQueue', customerSchema).findOneAndRemove({ _id })        
      },
            
      sendMessage : async (obj , { newMessage }) => {
        const {  conversationId, content, userId, service } = newMessage
        return await mongoose.model('sendMessage', conversationSchema).find({conversationId, resolved: false}).update({ $push: { messages: { content, userId, service }}})
      },
      archiveConversation : async (obj, { _id }) => { 
      console.log(_id , 'server')
      const result =  await mongoose.model('archiveConversation', conversationSchema).findOneAndUpdate({_id},{resolved :true})
      mongoose.connection.close()
      return result
      }
    }
  };

  module.exports = resolvers


  
