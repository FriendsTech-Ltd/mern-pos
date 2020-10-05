import mongoose from 'mongoose';

const invoiceSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  products: [{
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    sellingPrice: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    unit: {
      type: String,
      enum: ['piece', 'kg', 'litter', 'pack'],
    },
  },
  ],
},
{
  timestamps: true,
});

const Invoice = mongoose.model('invoice', invoiceSchema);
export default Invoice;
