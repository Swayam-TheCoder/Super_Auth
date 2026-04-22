import express from 'express';

const router = express.Router();

import {createUser, getUsers, getUserById, deleteUser, updateUser} from '../controllers/userController.js';

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;