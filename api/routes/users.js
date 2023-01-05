import express from 'express';
import { deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/UserController.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

/*
router.get('/authenticate', verifyToken, (req, res, next) => {
	res.send('hello user, you are logged in!');
});
router.get('/check-user/:id', verifyUser, (req, res, next) => {
	res.send('hello user, you are logged in and can delete!');
});
router.get('/check-admin/:id', verifyAdmin, (req, res, next) => {
	res.send('hello user, you are logged in as admin!');
});
*/

router.get('/', verifyAdmin, getAllUsers);
router.get('/:id', verifyUser, getUserById);
router.put('/:id', verifyUser,updateUser);
router.delete('/:id', verifyUser,deleteUser);

export default router;