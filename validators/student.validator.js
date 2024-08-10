import Joi from 'joi';

export const studentSchemaValidator = Joi.object({
    firstName: Joi.string().min(1).max(50).required().messages({
        'string.base': 'First name should be a string.',
        'string.empty': 'First name cannot be empty.',
        'string.min': 'First name should have a minimum length of 1 character.',
        'string.max': 'First name should have a maximum length of 50 characters.',
        'any.required': 'First name is required.'
    }),
    lastName: Joi.string().min(1).max(50).required().messages({
        'string.base': 'Last name should be a string.',
        'string.empty': 'Last name cannot be empty.',
        'string.min': 'Last name should have a minimum length of 1 character.',
        'string.max': 'Last name should have a maximum length of 50 characters.',
        'any.required': 'Last name is required.'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a string.',
        'string.email': 'Email must be a valid email address.',
        'string.empty': 'Email cannot be empty.',
        'any.required': 'Email is required.'
    }),
    dateOfBirth: Joi.date().iso().required().messages({
        'date.base': 'Date of birth must be a valid date.',
        'date.isoDate': 'Date of birth must be in ISO date format.',
        'any.required': 'Date of birth is required.'
    }),
    gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
        'string.base': 'Gender should be a string.',
        'string.valid': 'Gender must be one of the following values: male, female, other.',
        'string.empty': 'Gender cannot be empty.',
        'any.required': 'Gender is required.'
    }),
});