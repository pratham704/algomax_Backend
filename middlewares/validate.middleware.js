import * as validator from '../validators/student.validator.js';

export const validateStudentCreation = (req, res, next) => {
    const student = req.body;

    const { error } = validator.studentSchemaValidator.validate(student);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};


export const validateStudentLogin = (req, res, next) => {
    const student = req.body;

    const { error } = validator.studentLoginValidator.validate(student);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};