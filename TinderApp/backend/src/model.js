var mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
  brand: String,
  color: String,
  description: String,
  manufacturer: String,
  price: String,
  title: String,
  source: String,
  country: String
})
exports.Product = mongoose.model('products', productSchema)
