# API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [User Verification](#user-verification)
4. [User Endpoints](#user-endpoints)
5. [Organizer Endpoints](#organizer-endpoints)
6. [Payment Integration](#payment-integration)
7. [Security](#security)

## Overview

Base URL: `/api/v1`

### Global Headers
```
Content-Type: application/json
Authorization: Bearer <token> (for protected routes)
```

### Standard Response Format
```json
{
  "status": "success|fail",
  "message": "string",
  "data": {} | []
}
```

## Authentication

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

## User Endpoints

### Get All Events
- **URL:** `/api/v1/user/events`
- **Method:** `GET`
- **Authentication:** Required
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of events

### Get Event by ID
- **URL:** `/api/v1/user/events/:id`
- **Method:** `GET`
- **Authentication:** Required
- **Success Response:**
  - **Code:** 200
  - **Content:** Single event details

### Book Event
- **URL:** `/api/v1/user/book`
- **Method:** `POST`
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "organizer_id": "string",
    "event_id": "string",
    "number_of_tickets": "number",
    "amount": "number"
  }
  ```

### Get My Tickets
- **URL:** `/api/v1/user/my-tickets`
- **Method:** `GET`
- **Authentication:** Required

### Get Single Ticket Details
- **URL:** `/api/v1/user/my-tickets/:id`
- **Method:** `GET`
- **Authentication:** Required

## Organizer Endpoints

### Create Event
- **URL:** `/api/v1/organizer/events`
- **Method:** `POST`
- **Role:** Organizer
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "location": "string",
    "date": "string",
    "time": "string",
    "category": "string",
    "ticket_price": "number",
    "total_tickets": "number",
    "image": "string (optional)"
  }
  ```

### Get Organizer's Events
- **URL:** `/api/v1/organizer/events`
- **Method:** `GET`
- **Role:** Organizer

### Get Single Event
- **URL:** `/api/v1/organizer/event`
- **Method:** `GET`
- **Role:** Organizer
- **Query:** `eventId=string`

### Update Event
- **URL:** `/api/v1/organizer/events`
- **Method:** `PUT`
- **Role:** Organizer
- **Request Body:**
  ```json
  {
    "eventId": "string",
    "title": "string (optional)",
    "description": "string (optional)",
    // ... other optional fields
  }
  ```

## Payment Integration

### Create Payment Order
- **URL:** `/api/v1/user/create-order/:id`
- **Method:** `POST`
- **Authentication:** Required
- **Provider:** Cashfree Payment Gateway

### Verify Payment Order
- **URL:** `/api/v1/user/verify-order`
- **Method:** `POST`
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "orderId": "string"
  }
  ```

## Security

### Authentication Middleware
- JWT-based authentication
- Token format: `Bearer <token>`
- Token validation on protected routes

### Role-Based Access Control
- Organizer role verification
- Protected routes for specific roles
- Role-specific endpoints

### Rate Limiting
- Window: 15 minutes
- Max Requests: 100 per window

### Additional Security Measures
- Helmet.js for security headers
- CORS protection
- Input validation
- Error handling

### Error Codes
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error


