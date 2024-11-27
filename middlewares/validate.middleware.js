export const validateRegister = (req, res, next) => {
    const { firebaseUid, name, email, role } = req.body;

    // Validate firebaseUid
    if (!firebaseUid || typeof firebaseUid !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing firebaseUid.' });
    }

    // Validate name
    if (!name || typeof name !== 'string' || name.length > 100) {
        return res.status(400).json({ message: 'Invalid or missing name.' });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid or missing email.' });
    }

    // Validate role
    const allowedRoles = ['user', 'organizer', 'admin'];
    if (!role || !allowedRoles.includes(role)) {
        return res.status(400).json({ message: `Invalid role. Allowed roles are: ${allowedRoles.join(', ')}` });
    }

    next();
};

export const validateLogin = (req, res, next) => {
    const { firebaseUid } = req.body;

    // Validate firebaseUid
    if (!firebaseUid || typeof firebaseUid !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing firebaseUid.' });
    }

    next();
};