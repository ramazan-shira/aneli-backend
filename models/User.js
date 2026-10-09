import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: { type: String, default: 'Administrator' },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
}, { timestamps: true });
export default mongoose.model('User', schema);   // stored in the "users" collection
