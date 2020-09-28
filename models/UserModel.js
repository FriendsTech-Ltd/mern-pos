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
  password: {
    type: String,
    required: true,
  },

  reset_password_token: String,
  reset_password_expires: Date,
},
{
  timestamps: true,
});

const User = mongoose.model('user', userSchema);
export default User;
