import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  due: {
    type: Number,
    default: 0,
  },
  allTimeSellAmount: {
    type: Number,
    default: 0,
  },
  totalSell: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
    },
  ],
},
{
  timestamps: true,
});

const Customer = mongoose.model('customer', customerSchema);
export default Customer;
