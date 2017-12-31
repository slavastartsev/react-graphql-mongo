import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: [8, 'Password is too short'],
    max: [30, 'Please provide shorter password'],
  },
});

export default mongoose.model('user', UserSchema);
