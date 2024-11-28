import express from 'express';

const router = express.Router();

import { authenticate } from '../middlewares/auth.middleware.js';

import { getAllEvents } from '../controllers/user.controller.js';

// router.get('/check', getEvents);

router.get('/get-all-events', authenticate, getAllEvents);




export default router;