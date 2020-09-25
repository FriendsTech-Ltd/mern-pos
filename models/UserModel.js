const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  company_name: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  company_type: {
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

const User = mongoose.model('Auth', userSchema);
module.exports = User;
