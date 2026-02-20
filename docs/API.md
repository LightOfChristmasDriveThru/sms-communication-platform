# API Documentation for SMS Communication Platform

## Overview
This document provides details about the API endpoints available in the SMS Communication Platform.

## API Endpoints

### 1. Send SMS
- **Endpoint:** `/api/sms/send`
- **Method:** `POST`
- **Description:** Sends an SMS to a specified phone number.
- **Request Body:**
  ```json
  {
      "to": "string",
      "message": "string"
  }
  ```
- **Response:**
  - **200 OK:** SMS sent successfully.
  - **400 Bad Request:** Invalid parameters.

### 2. Get SMS Status
- **Endpoint:** `/api/sms/status`
- **Method:** `GET`
- **Description:** Retrieves the status of a sent SMS.
- **Query Parameters:**
  - `id`: The ID of the SMS message.
- **Response:**
  - **200 OK:** Returns the status of the message.
  - **404 Not Found:** SMS not found.

### 3. List SMS Logs
- **Endpoint:** `/api/sms/logs`
- **Method:** `GET`
- **Description:** Lists all SMS logs.
- **Response:**
  - **200 OK:** Returns a list of SMS logs.
  - **500 Internal Server Error:** Issue retrieving logs.

## Error Handling
Error responses will include a message and a status code to help diagnose the issue.

---

This document will be updated as new features are added to the API.