const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
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
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'Users',
    required: true,
  },
}, {
    timestamps: true
});


const Product2 = mongoose.model('Product2', ProductSchema);
module.exports = Product2;