import express from 'express'
import { checkAuth, loginUser, registerUser, updateProfile } from '../controllers/authControllers.js'
import {protectedRoutes} from '../middlewares/auth.js'

const router = express.Router()

router.post('/signup', registerUser)
router.post('/login', loginUser);
router.put('/update',protectedRoutes, updateProfile);
router.get('/check', protectedRoutes, checkAuth);

export default router