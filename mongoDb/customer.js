const mongoose = require('mongoose')
const schema = mongoose.Schema


const customerSchema = new schema({
    customerName: String,},
    {
    collection: 'customers' ,upsert :true, timestamps:true
});
  

module.exports = customerSchema
