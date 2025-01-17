const mongoose = require('mongoose');

const ShopSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    required: [true, 'Please add a shop Name'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  openHours: {
    type: String,
    required: [true, 'Please add a open hours'],
  },
  locations: {
    type: String,
    required: [true, 'Please add a location'],
  },
  services: {
    type: String,
    required: [true, 'Please add a services'],
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'Users',
    required: true,
  },
}, {
    timestamps: true
});


const Shop = mongoose.model('Shop', ShopSchema);
module.exports = Shop;