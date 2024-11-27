import { getData, verifyToken, } from "../utils/auth/jwt.utils.js";
import { fail_response } from "../utils/responses/responses.js";


export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return fail_response(res, 401, "No token provided")
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
        return fail_response(res, 401, "Invalid token format")
    }

    try {
        req.user = verifyToken(token);
        next();
    } catch (error) {
        return fail_response(res, 401, "Invalid or Expired token provided")
    }
};



export const AuthenticateOrganizer = (req, res, next) => {
    try {
        const { role } = getData(req);
        console.log(role, "from the auth.middleware.js")
        if (role !== "organizer") {
            return fail_response(res, 403, "You are not authorized to access this resource")
        }
        next();
    } catch (error) {
        console.log(error.message, "From the auth.middleware.js")
        return fail_response(res, 401, "Invalid or Expired token provided")
    }

};