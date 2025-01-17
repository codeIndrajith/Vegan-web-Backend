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
},
{
  toJSON: { virtuals: true, versionKey: false, transform: removeIdField },
  toObject: { virtuals: true, versionKey: false, transform: removeIdField },
});

// Helper function to remove `id` field
function removeIdField(doc, ret) {
  delete ret.id; // Remove `id`
  return ret;
}

// Reverse populate with virtuals
ShopSchema.virtual('foods', {
  ref: 'Food',
  localField: '_id',
  foreignField: 'shop',
  justOne: false,
});


const Shop = mongoose.model('Shop', ShopSchema);
module.exports = Shop;