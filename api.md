# API Documentation

## Authentication Endpoints

### Register User
- **URL:** `/api/v1/auth/register`
- **Method:** `POST`
- **Authentication:** None
- **Request Body:**
  ```json
  {
    "firebaseUid": "string (required)",
    "name": "string (required)",
    "email": "string (required)",
    "role": "string (required)"
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
      "status": "success",
      "message": "User created successfully.",
      "data": {
        "user": {
          // user details
        },
        "token": "JWT_TOKEN"
      }
    }
    ```
- **Error Responses:**
  - **Code:** 400
    ```json
    {
      "status": "fail",
      "message": "All fields are required."
    }
    ```
  - **Code:** 400
    ```json
    {
      "status": "fail",
      "message": "User already exists."
    }
    ```

### Login User
- **URL:** `/api/v1/auth/login`
- **Method:** `POST`
- **Authentication:** None
- **Request Body:**
  ```json
  {
    "firebaseUid": "string (required)"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": "success",
      "message": "Login successful.",
      "data": {
        "user": {
          // user details
        },
        "token": "JWT_TOKEN"
      }
    }
    ```
- **Error Responses:**
  - **Code:** 404
    ```json
    {
      "status": "fail",
      "message": "User not found."
    }
    ```

## User Verification

### Check User Authentication
- **URL:** `/api/v1/checkUser`
- **Method:** `GET`
- **Authentication:** Required
- **Description:** Verifies if a user's token is valid and returns user data
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": "success",
      "message": "User is authenticated",
      "data": {
        "firebaseUid": "string",
        "role": "string",
        "email": "string"
      }
    }
    ```
- **Error Response:**
  - **Code:** 500
    ```json
    {
      "status": "fail",
      "message": "Error message"
    }
    ```
- **Usage:** 
  - Used to verify token validity
  - Can be used for session management
  - Helpful for client-side authentication state

## Authentication Middleware

The API uses JWT (JSON Web Token) based authentication. Protected routes require a valid JWT token in the Authorization header.

### Token Format

## Organizer Endpoints

### Create Event
- **URL:** `/api/v1/organizer/events`
- **Method:** `POST`
- **Authentication:** Required
- **Role:** Organizer
- **Request Body:**
  ```json
  {
    "title": "string (required)",
    "description": "string (required)",
    "location": "string (required)",
    "date": "string (required)",
    "time": "string (required)",
    "category": "string (required)",
    "ticket_price": "number (required)",
    "total_tickets": "number (required)",
    "image": "string (optional)"
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
      "status": "success",
      "message": "Event created successfully"
    }
    ```
- **Error Response:**
  - **Code:** 400
    ```json
    {
      "status": "fail",
      "message": "Validation error details"
    }
    ```

### Get Organizer's Events
- **URL:** `/api/v1/organizer/events`
- **Method:** `GET`
- **Authentication:** Required
- **Role:** Organizer
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": "success",
      "message": "Events fetched successfully",
      "data": [
        // Array of organizer's events
      ]
    }
    ```

### Get Single Event
- **URL:** `/api/v1/organizer/event`
- **Method:** `GET`
- **Authentication:** Required
- **Role:** Organizer
- **Query Parameters:** `eventId=[string]`
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": "success",
      "message": "Event fetched successfully",
      "data": {
        // Event details
      }
    }
    ```
- **Error Response:**
  - **Code:** 400
    ```json
    {
      "status": "fail",
      "message": "Event ID is required"
    }
    ```

### Update Event
- **URL:** `/api/v1/organizer/events`
- **Method:** `PUT`
- **Authentication:** Required
- **Role:** Organizer
- **Request Body:**
  ```json
  {
    "eventId": "string (required)",
    "title": "string (optional)",
    "description": "string (optional)",
    "location": "string (optional)",
    "date": "string (optional)",
    "time": "string (optional)",
    "category": "string (optional)",
    "ticket_price": "number (optional)",
    "total_tickets": "number (optional)",
    "image": "string (optional)"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
      "status": "success",
      "message": "Event updated successfully",
      "data": {
        // Updated event details
      }
    }
    ```
- **Error Response:**
  - **Code:** 400
    ```json
    {
      "status": "fail",
      "message": "Event ID is required"
    }
    ```

## Role-Based Access Control

### Organizer Role
- Only users with the "organizer" role can access organizer endpoints
- Role verification is handled by the `AuthenticateOrganizer` middleware
- Organizers can:
  - Create events
  - View their events
  - Update their events
  - Get details of specific events they created

### Error Handling
All endpoints include standardized error handling:
- 400: Bad Request (validation errors)
- 401: Unauthorized (authentication errors)
- 403: Forbidden (insufficient permissions)
- 500: Internal Server Error

### Data Validation
- Event data is validated before processing
- Price values are parsed as floats
- Ticket quantities are parsed as integers
- Required fields are checked before creation/updates


