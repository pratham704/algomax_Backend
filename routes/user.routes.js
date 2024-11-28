import express from 'express';

const router = express.Router();

import { authenticate } from '../middlewares/auth.middleware.js';

import { getAllEvents, getEventById, bookEvent, createOrder, verifyOrder, myTickets, myTicketWithSingleEventDetails } from '../controllers/user.controller.js';

// router.get('/check', getEvents);

router.get('/get-all-events', authenticate, getAllEvents);

router.get('/get-event-by-id/:id', authenticate, getEventById);

router.post('/payment/book-event', authenticate, bookEvent);

router.get('/payment/my-tickets', authenticate, myTickets);

router.get('/payment/my-ticket-with-single-event-details/:id', authenticate, myTicketWithSingleEventDetails);


router.get('/payment/create-order/:id', authenticate, createOrder);
router.post('/payment/verify-order', authenticate, verifyOrder);




// example of above route: http://localhost:3000/api/user/get-event-by-id/1



export default router;