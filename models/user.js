import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true  
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date,
  
}, { timestamps: true });

export default mongoose.model("User", userSchema);

// This code defines a Mongoose schema for a User model in a MERN (MongoDB, Express, React, Node.js) application. The schema includes fields for the user's name, email, password, reset token, and reset token expiration date. The email field is set to be unique to prevent duplicate entries. The schema also includes timestamps to automatically track when each user document is created and updated. Finally, the model is exported for use in other parts of the application.