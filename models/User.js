import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      // required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    dateOfBirth: {
      type: String,
    },
    nationalID: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
