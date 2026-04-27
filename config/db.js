// database connection file

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected`); 

  } catch (err) {
    console.error(`Database connection failed: ${err.message}`);
    process.exit(1); // stop the server if there is a connection error
  }
};

export default connectDB;