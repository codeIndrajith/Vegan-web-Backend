const mongoose = require('mongoose');

const BuyProductSchema = mongoose.Schema({
  qty: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  },
  product2Id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product2'
  },
  foodId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Food'
  },
  buyer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
});


const BuyProducts = mongoose.model('BuyProducts', BuyProductSchema);
module.exports = BuyProducts;