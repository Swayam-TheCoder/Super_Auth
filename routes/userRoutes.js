import express from 'express';

const router = express.Router();
import {createUser, getUsers, getUserById, deleteUser, updateUser, forgetPassword, resetPassword, signup, login, getProfile, createNote } from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


router.post('/signup', signup);
router.post('/login', login);
router.post("/forgotpassword", forgetPassword);
router.post("/resetpassword/:token", resetPassword);
router.get('/', auth, getUsers);
router.get("/profile", auth, getProfile);
router.post("/notes", auth, createNote);

export default router;