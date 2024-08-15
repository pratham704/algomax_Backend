import {
    success_response,
    fail_response,
} from "../../utils/responses/responses.js";

export const getData = async(req, res) => {
    try {
        success_response(res, 200);
    } catch (error) {
        fail_response(res, 500);
    }
};

export const postData = async(req, res) => {
    try {
        success_response(res, 200);
    } catch (error) {
        fail_response(res, 500);
    }
};