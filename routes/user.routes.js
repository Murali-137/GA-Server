import express from 'express'
import {checkAuth, loginUser, logoutUser, registerUser} from '../controllers/user.controller.js';
import authUser from '../middlewares/AuthUser.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',authUser,logoutUser);
router.get('/is-auth',authUser,checkAuth);

export default router;