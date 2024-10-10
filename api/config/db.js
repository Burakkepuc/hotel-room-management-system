import mongoose from 'mongoose'
require('dotenv').config()
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;