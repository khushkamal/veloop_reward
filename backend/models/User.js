const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required']
    },
    avatar: {
      type: String,
      default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    },
    role: {
      type: String,
      enum: ['user', 'evaluator', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
