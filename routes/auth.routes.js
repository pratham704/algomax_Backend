import express from 'express';
import AuthController from '../controllers/auth/auth.student.controller.js';
import { validateLogin, validateRegister } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.post('/register', validateRegister, AuthController.createUser);

router.post('/login', validateLogin, AuthController.loginUser);

export default router;