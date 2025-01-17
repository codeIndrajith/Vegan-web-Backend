const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: [true, 'Please add a Product Name'],
  },
  productPrice: {
    type: Number,
    required: [true, 'Please add a Product Price'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  productIncludes: {
    type: String,
    required: [true, 'Please add a includes'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  shop: {
    type: mongoose.Schema.ObjectId,
    ref: 'Shop',
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'Users',
    required: true,
  },
});


const Food = mongoose.model('Food', FoodSchema);
module.exports = Food;