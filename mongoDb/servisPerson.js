const mongoose = require('mongoose')
const schema = mongoose.Schema


const servicePersonSchema = new schema({
    servicePersonName: String,},
    {
    collection: 'availableForService' ,upsert :true, timestamps:true
});
  

module.exports = servicePersonSchema
