import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // removed required
  role: { type: String, default: "user" }, // 'user' or 'admin'
  googleId: { type: String }, // store Google user id
  provider: { type: String, default: "local" }, // "local" or "google"
  avatar: { type: String, default: null },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
