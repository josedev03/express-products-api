const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  imageURL: String
}, {
  // eliminar el campo __V
  versionKey: false
})

module.exports = mongoose.model('product', productSchema)