import mongoose, { mongo } from "mongoose";

const roomSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  type: { type: String, enum: ['Basic', 'Premium', 'Suite'], required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  isAvailable: { type: Boolean, default: true },
}, { versionKey: false });


const Room = mongoose.model('Room', roomSchema)

export default Room;