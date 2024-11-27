import UserModel from '../../models/mainModels/user.model.js';
import { generateToken } from '../../utils/auth/jwt.utils.js';
import { getConnection, releaseConnection } from '../../config/database.js';
import { success_response, fail_response } from '../../utils/responses/responses.js';

class AuthController {
    static async createUser(req, res) {
        let connection;
        try {
            const { firebaseUid, name, email, role } = req.body;

            if (!firebaseUid || !name || !email || !role) {
                return fail_response(res, 400, 'All fields are required.');
            }

            connection = await getConnection();
            const [existingUser] = await connection.execute('SELECT * FROM users WHERE firebaseUid = ?;', [firebaseUid]);
            if (existingUser.length > 0) {
                return fail_response(res, 400, 'User already exists.');
            }

            const user = await UserModel.createUser({ firebaseUid, name, email, role });

            const token = generateToken({ firebaseUid, role, email });

            let response = {
                user,
                token
            }

            return success_response(res, 201, 'User created successfully.', response);
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ error: 'An error occurred while creating the user.' });
        } finally {
            await releaseConnection(connection);
        }
    }

    static async loginUser(req, res) {
        let connection;
        try {
            const { firebaseUid } = req.body;

            if (!firebaseUid) {
                return res.status(400).json({ error: 'Firebase UID is required.' });
            }

            connection = await getConnection();


            const [user] = await connection.execute('SELECT * FROM users WHERE firebaseUid = ?;', [firebaseUid]);

            if (user.length === 0) {
                return fail_response(res, 404, 'User not found.');
            }

            const { role, email } = user[0];
            const token = generateToken({ firebaseUid, role, email });

            let response = {
                user,
                token
            }


            return success_response(res, 200, 'Login successful.', response);
        } catch (error) {
            console.error('Error logging in user:', error);
            return res.status(500).json({ error: 'An error occurred while logging in.' });
        } finally {
            await releaseConnection(connection);
        }

    }
}

export default AuthController;