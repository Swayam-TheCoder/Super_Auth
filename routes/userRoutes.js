import express from 'express';

const router = express.Router();
import {signup, login} from '../controllers/userController.js';
import {createUser, getUsers, getUserById, deleteUser, updateUser} from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.post('/signup', signup);
router.post('/login', login);
router.get('/', auth, getUsers);

export default router;