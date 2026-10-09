import mongoose from 'mongoose';
export const STATUSES = ['ordered', 'in_preparation', 'handed_to_courier', 'delivered'];
const schema = new mongoose.Schema({
  customerName: { type: String, required: true }, phone: String, address: String,
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, name: String, price: Number, qty: Number }],
  total: Number, status: { type: String, enum: STATUSES, default: 'ordered' },
  source: { type: String, enum: ['website', 'phone'], default: 'website' },
}, { timestamps: true });
export default mongoose.model('Order', schema);
