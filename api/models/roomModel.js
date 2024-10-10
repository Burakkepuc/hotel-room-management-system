import mongoose, { mongo } from "mongoose";

const roomSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  type: { type: String, enum: ['basic', 'premium', 'suite'], required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  isAvailable: { type: Boolean, default: true },
  availableDates: [{ start: Date, end: Date }]

}, { versionKey: false });


const Room = mongoose.model('Room', roomSchema)

export default Room;