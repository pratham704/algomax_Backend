import Joi from 'joi';

export const studentSchemaValidator = Joi.object({
    firstName: Joi.string().min(1).max(50).required().messages({
        'string.base': 'First name should be a string.',
        'string.empty': 'First name cannot be empty.',
        'string.min': 'First name should have at least 1 character.',
        'string.max': 'First name should have at most 50 characters.',
        'any.required': 'First name is required.'
    }),
    lastName: Joi.string().min(1).max(50).required().messages({
        'string.base': 'Last name should be a string.',
        'string.empty': 'Last name cannot be empty.',
        'string.min': 'Last name should have at least 1 character.',
        'string.max': 'Last name should have at most 50 characters.',
        'any.required': 'Last name is required.'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a string.',
        'string.email': 'Please enter a valid email address.',
        'string.empty': 'Email cannot be empty.',
        'any.required': 'Email is required.'
    }),
    password: Joi.string().min(8).max(20).required().messages({
        'string.base': 'Password should be a string.',
        'string.empty': 'Password cannot be empty.',
        'string.min': 'Password should have at least 8 characters.',
        'string.max': 'Password should have at most 20 characters.',
        'any.required': 'Password is required.'
    }),
    dateOfBirth: Joi.date().iso().required().messages({
        'date.base': 'Date of birth must be a valid date.',
        'date.isoDate': 'Please enter the date in ISO format (YYYY-MM-DD).',
        'any.required': 'Date of birth is required.'
    }),
    gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
        'string.base': 'Gender should be a string.',
        'any.only': 'Gender must be one of the following: Male, Female, Other.',
        'string.empty': 'Gender cannot be empty.',
        'any.required': 'Gender is required.'
    }),
});



export const studentLoginValidator = Joi.object({


    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a string.',
        'string.email': 'Please enter a valid email address.',
        'string.empty': 'Email cannot be empty.',
        'any.required': 'Email is required.'
    }),
    password: Joi.string().min(8).max(20).required().messages({
        'string.base': 'Password should be a string.',
        'string.empty': 'Password cannot be empty.',
        'string.min': 'Password should have at least 8 characters.',
        'string.max': 'Password should have at most 20 characters.',
        'any.required': 'Password is required.'
    })
});