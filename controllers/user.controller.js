import EventModel from "../models/mainModels/event.model.js";
import { getData } from "../utils/auth/jwt.utils.js";
import { success_response, fail_response } from "../utils/responses/responses.js";
import BookingModel from "../models/mainModels/booking.model.js";
import { getConnection, releaseConnection } from "../config/database.js";
import { Cashfree } from 'cashfree-pg';
import dotenv from 'dotenv';
dotenv.config();

Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

export const getAllEvents = async(req, res) => {
    try {
        const events = await EventModel.getAllEvents();
        success_response(res, 200, "All events fetched successfully", events);
    } catch (error) {
        fail_response(res, 500, error.message);
    }

}

export const getEventById = async(req, res) => {

    try {
        const { id } = req.params;
        const event = await EventModel.getEventById(id);
        success_response(res, 200, "Event fetched successfully", event);
    } catch (error) {
        fail_response(res, 500, error.message);
    }

}

export const bookEvent = async(req, res) => {

    const { firebaseUid } = getData(req);

    try {
        const { organizer_id, event_id, number_of_tickets, amount } = req.body;
        // validate the data
        if (!organizer_id || !event_id || !number_of_tickets || !amount) {
            fail_response(res, 400, "All fields are required");
        }
        if (amount <= 0) {
            fail_response(res, 400, "Amount must be greater than 0");
        }

        // check if number of tickets is greater than available tickets
        const event = await EventModel.getEventById(event_id);
        if (number_of_tickets > event.available_tickets) {
            fail_response(res, 400, "Not enough tickets available");
        }


        const available_tickets = event[0].available_tickets - number_of_tickets;

        console.log(available_tickets, "available_tickets");

        const updatedEvent = await EventModel.updateEventWhileBooking(event_id, available_tickets);

        const booking = await BookingModel.createBooking({
            eventId: event_id,
            userId: firebaseUid,
            ticketsBooked: number_of_tickets
        });

        success_response(res, 200, "Event booked successfully");


    } catch (error) {
        console.log(error);
        fail_response(res, 500, error.message);
    }

}




export const createOrder = async(req, res) => {

    const { id } = req.params;

    const { firebaseUid, email } = getData(req);

    try {
        const request = {
            order_amount: id,
            order_currency: "INR",
            order_id: await generateOrderId(),
            customer_details: {
                customer_id: firebaseUid,
                customer_phone: '8073970294',
                customer_name: 'User',
                customer_email: email || 'pratham.siddannavar28@gmail.com'
            },
        };
        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        success_response(res, 200, "Order id generated", response.data)
    } catch (error) {
        console.log(error);
        fail_response(res, 500, "Internal server error")
    }
};


const generateOrderId = async() => {

    // must be a string
    return Date.now().toString();
}

export const verifyOrder = async(req, res) => {
    try {
        const { orderId } = req.body;
        const response = await Cashfree.PGFetchOrder("2023-08-01", orderId);
        console.log(response.data)
        const paymentStatus = response.data.order_status;
        success_response(res, 200, "Payment record created successfully", data);
    } catch (error) {
        fail_response(res, 500, "Internal server error");
    }
};



export const myTickets = async(req, res) => {

    const { firebaseUid } = getData(req);

    try {
        const tickets = await BookingModel.getMyTickets(firebaseUid);
        success_response(res, 200, "My tickets fetched successfully", tickets);
    } catch (error) {
        fail_response(res, 500, error.message);
    }

}


export const myTicketWithSingleEventDetails = async(req, res) => {

    const { firebaseUid } = getData(req);

    try {
        const { id } = req.params;
        const tickets = await BookingModel.getMyTicketWithThatSingleEventDetails(firebaseUid, id);
        success_response(res, 200, "My tickets fetched successfully", tickets);
    } catch (error) {
        fail_response(res, 500, error.message);
    }

}