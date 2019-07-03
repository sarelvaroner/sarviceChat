const mongoose = require('mongoose')
const schema = mongoose.Schema

mongoose.connect(process.env.DB_URL_CONNECTION, {useNewUrlParser: true})
mongoose.connection.once('open', ()=> console.log('connect to mongoDb'))


const messageSchema = new schema({
    content: String,
    timeStamp: String,
    authorId: String,
    authorName: String,
    authorType: String,    
})


const conversationSchema = new schema({conversation: [messageSchema],})
  

module.exports = mongoose.model('conversation', conversationSchema, 'conversations')