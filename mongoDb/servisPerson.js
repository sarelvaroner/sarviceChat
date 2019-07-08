const mongoose = require('mongoose')
const schema = mongoose.Schema


const servicePersonSchema = new schema({
    servicePersonName: String,
    available: Boolean,
    },
    {collection: 'availableForService' ,upsert :true, timestamps:true
});
  

module.exports = servicePersonSchema
