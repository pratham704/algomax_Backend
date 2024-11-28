import { success_response, fail_response } from "../utils/responses/responses.js";
import { getData } from "../utils/auth/jwt.utils.js";

export const checkUser = async(req, res) => {
    try {
        const data = getData(req);
        success_response(res, 200, "User is authenticated", data);
    } catch (error) {
        fail_response(res, 500, error.message);
    }
}