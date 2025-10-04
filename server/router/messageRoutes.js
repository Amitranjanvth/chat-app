import express from 'express'
import {protectedRoutes} from '../middlewares/auth.js'
import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage } from '../controllers/messageController.js';

const messageRoute = express.Router();

messageRoute.get('/users', protectedRoutes, getUsersForSidebar)
messageRoute.get('/:id', protectedRoutes, getMessages);
messageRoute.put('/mark/:id', protectedRoutes, markMessageAsSeen)
messageRoute.post('/send/:id', protectedRoutes, sendMessage)

export default messageRoute;