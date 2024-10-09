import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/hotel-reservation-api");
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;