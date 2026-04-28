import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import crypto from 'crypto';

// For signup
export const signup = async (req, res) => {
  try{
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name, email, password: hashedPassword
    });

    res.status(201).json({message: 'User created successfully', user});
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
}

// For login
export const login = async (req, res) => {
  try{
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token });
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
}

// forget password
export const forgetPassword = async (req, res) => {
  try{
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'user not found' });

    const token = crypto.randomBytes(32).toString('hex'); // generate using crypto
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 10 * 60 * 1000;
    await user.save();
    
    // for now return token in response, later we can send email to user with this token
    res.json({ 
      message: 'Password forget token generated successfully', 
      token: token 
    });
  } 
  catch(err){
    res.status(500).json({ error: err.message });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  try{
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 means salt rounds or It controls how complex the hashing is
//     10 → standard (used in most apps)
//     12+ → more secure, slightly slower
//    8 → faster, less secure (not recommended for production)
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();
    res.json({ message: "Password reset successful" });
  } 
  catch(err){
    res.status(500).json({ error: err.message });
  }
};


// Create a new user
export const createUser = async (req, res) => {
  try{
    const user = await User.create(req.body);
    res.status(201).json(user);
  }
  catch(err){
    res.status(400).json({ error: err.message });
  }
}

// get all users
export const getUsers = async (req, res) => {
  try{
    const users = await User.find();
    res.json(users);
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
}

// get a user by id
export const getUserById = async(req, res) => {
  try{
    const getUser = await User.findById(req.params.id);
    if(!getUser){
      return res.status(500).json({ error: 'User not found' });
    }
    res.json(getUser);
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
}

export const updateUser = async(req, res) => {
  try{
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!updateUser){
      return res.status(500).json({ error: 'User not found' });
    }
    res.json(updateUser);
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
}

export const deleteUser = async(req, res) => {
  try{
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if(!deleteUser){
      return res.status(500).json ({err: 'User not found'});
  }
  res.json({ message: 'User deleted successfully' });
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
}