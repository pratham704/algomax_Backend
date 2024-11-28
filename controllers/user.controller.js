import EventModel from "../models/mainModels/event.model.js";
import { success_response, fail_response } from "../utils/responses/responses.js";

export const getAllEvents = async(req, res) => {
    try {
        const events = await EventModel.getAllEvents();
        success_response(res, 200, "All events fetched successfully", events);
    } catch (error) {
        fail_response(res, 500, error.message);
    }

}