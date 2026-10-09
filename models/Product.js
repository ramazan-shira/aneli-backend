import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: { type: String, required: true }, description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 }, image: { type: String, default: '' },
  badge: { type: String, default: '' },
}, { timestamps: true });
export default mongoose.model('Product', schema);
