import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  companyName: {
    type: String,
  },
  companyOwner: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  companyType: {
    type: String,
  },
  description: {
    type: String,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    default: '/uploads/default.jpg',
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
},
{
  timestamps: true,
});

const User = mongoose.model('user', userSchema);
export default User;
