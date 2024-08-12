import { verifyToken } from "../utils/auth/jwt.utils.js";

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    try {
        req.user = verifyToken(token);
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};