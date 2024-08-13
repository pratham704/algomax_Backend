import * as authStudentService from "../../services/auth.service/auth.service.student.js";
import { success_response, fail_response } from "../../utils/responses/responses.js";
export const createStudent = async(req, res) => {
    const student = req.body;

    try {
        const { status_code, obj } = await authStudentService.createStudentService(student);
        success_response(res, status_code, obj)
            // res.status(status_code).json(obj);
    } catch (error) {
        console.log(error.message, "development error") //  gives me actual error in the db 
        fail_response(res, error.error_status_code, error.error_message)
            // res.status(error.error_status_code).json({ "message": error.error_message })

    }
};

export const loginStudent = async(req, res) => {
    const student = req.body;

    try {
        const { status_code, obj } = await authStudentService.loginStudentService(
            student
        );
        success_response(res, status_code, obj)

        // res.status(status_code).json(obj);
    } catch (error) {
        console.log(error.message, "development error")
        fail_response(res, error.error_status_code, error.error_message)

        // res.status(error.error_status_code).json({ "message": error.error_message })

    }
};