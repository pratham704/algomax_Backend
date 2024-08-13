# Project Name

## Overview

This Node.js project follows a modular architecture to facilitate scalability and maintainability. It utilizes ES6 modules, environment-based configuration, and a comprehensive set of tools and libraries to build a robust application.

## Project Structure

- **`config/`**: Contains configuration files for different environments and database connections.
  - `env/`: Environment-specific configuration files.
    - `development.js`: Development environment settings.
    - `production.js`: Production environment settings.
    - `test.js`: Testing environment settings.
  - `config.js`: Main configuration file.
  - `constants.js`: Constant values used across the application.
  - `database.js`: Database connection configuration.
- **`controllers/`**: Manages request handling and response sending.
  - `auth/`: Authentication-related controllers.
    - `auth.student.controller.js`: Controller for student authentication.
  - `student.controller.js`: Controller for student-related operations.
- **`middlewares/`**: Middleware functions for handling requests.
  - `auth.middleware.js`: Authentication middleware.
  - `errorHandlers.js`: Error handling middleware.
  - `validate.middleware.js`: Validation middleware.
- **`models/`**: Defines data models for interacting with the database.
  - `student.model.js`: Student model.
  - `teacher.model.js`: Teacher model.
- **`routes/`**: Defines the application's API routes.
  - `student.routes.js`: Routes related to student operations.
- **`services/`**: Contains business logic and interactions with the database.
  - `auth/`: Authentication-related services.
    - `auth.service.student.js`: Service for student authentication.
  - `student.service.js`: Service for student operations.
  - `teacher.service.js`: Service for teacher operations.
  - `z.create.table.query.js`: SQL queries for table creation.
- **`tests/`**: Contains unit and integration tests.
- **`utils/`**: Utility functions for various tasks.
  - `auth/`: Authentication utilities.
    - `bcrypt.password.js`: Password hashing utilities using bcrypt.
    - `jwt.utils.js`: JWT utility functions.
  - `responses/`: Utilities for handling responses.
    - `mysql.ErrorMap.js`: Error mapping for MySQL.
    - `responses.js`: General response utilities.
    - `status.messages.js`: Status messages and codes.
- **`validators/`**: Request validation logic.
  - `student.validator.js`: Validation for student-related requests.

## Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
