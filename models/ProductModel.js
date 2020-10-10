const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  sellingPrice: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    enum: ['piece', 'kg', 'litter', 'pack'],
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
  },

},
{
  timestamps: true,
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;
