import User from '../models/user.js';

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