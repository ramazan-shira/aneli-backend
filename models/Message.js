import mongoose from "mongoose";
export default mongoose.model(
  "Message",
  new mongoose.Schema(
    { name: String, email: String, message: String },
    { timestamps: true },
  ),
);
