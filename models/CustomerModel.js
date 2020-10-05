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
    unique: true,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  due: {
    type: Number,
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
