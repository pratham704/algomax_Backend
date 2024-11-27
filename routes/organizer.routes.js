import express from 'express';
import { AuthenticateOrganizer, authenticate } from '../middlewares/auth.middleware.js';
import { createEvent, getEvents, getSingleEvent, updateEvent } from '../controllers/organizer.controller.js';
const router = express.Router();


router.post('/create-event', authenticate, AuthenticateOrganizer, createEvent);
router.get('/get-events', authenticate, AuthenticateOrganizer, getEvents);
router.get('/get-single-event', authenticate, AuthenticateOrganizer, getSingleEvent);
router.post('/update-event', authenticate, AuthenticateOrganizer, updateEvent);

// give the event id in the query params
// sameple url : http://localhost:5000/api/v1/organizer/get-single-event?eventId=1


export default router;