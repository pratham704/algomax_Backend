import Event from "../models/mainModels/event.model.js";
import { success_response, fail_response } from "../utils/responses/responses.js";
import { getData } from "../utils/auth/jwt.utils.js";
import validateEventData from "../validators/event.validator.js"

export const createEvent = async(req, res) => {
    try {
        const { firebaseUid } = getData(req);
        const { title, description, location, date, time, category, ticket_price, total_tickets, image } = req.body;
        const ticketPrice = parseFloat(ticket_price);
        const totalTickets = parseInt(total_tickets);

        const validationError = validateEventData({ title, description, location, date, time, category, ticketPrice, totalTickets });
        if (validationError) {
            return fail_response(res, 400, validationError);
        }
        const event = await Event.createEvent({ firebaseUid, title, description, location, image, date, time, category, ticketPrice, totalTickets });
        return success_response(res, 201, "Event created successfully");
    } catch (error) {
        if (!res.headersSent) {
            return fail_response(res, 500, error.message);
        }
    }
};

export const getEvents = async(req, res) => {
    try {
        const { firebaseUid } = getData(req);
        const events = await Event.getEvents(firebaseUid);
        return success_response(res, 200, 'Events fetched successfully', events);
    } catch (error) {
        if (!res.headersSent) {
            return fail_response(res, 500, error.message);
        }
    }
};

export const getSingleEvent = async(req, res) => {
    try {
        const { eventId } = req.query;
        if (!eventId) {
            return fail_response(res, 400, 'Event ID is required');
        }
        const { firebaseUid } = getData(req);
        const event = await Event.getSingleEvent(firebaseUid, eventId);
        return success_response(res, 200, 'Event fetched successfully', event);
    } catch (error) {
        if (!res.headersSent) {
            return fail_response(res, 500, error.message);
        }
    }

};



export const updateEvent = async(req, res) => {


    try {
        const { firebaseUid } = getData(req);
        const { eventId, ...updateFields } = req.body;

        if (!eventId) {
            return fail_response(res, 400, 'Event ID is required');
        }
        console.log("eventId", eventId);
        console.log("firebaseUid", firebaseUid);
        console.log(req.body);

        const event = await Event.updateEvent(firebaseUid, eventId, updateFields);
        success_response(res, 200, 'Event updated successfully', event);
    } catch (error) {
        if (!res.headersSent) {
            return fail_response(res, 500, error.message);
        }
    }

};