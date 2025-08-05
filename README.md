# socalsync-unit-2-final-stacey-t

## Overview
This is a full-stack web application for managing events. Users can add, edit, and delete events. Authentication is implemented using JWT, and events are associated with a specific user.

## Features
•	User registration and login (JWT-based authentication)
•	Add, edit, delete events
•	Frontend built with React
•	Backend built with Spring Boot
•	Uses MySQL for database

## Tech Stack
•	Frontend: React, HTML/CSS, JavaScript
•	Backend: Spring Boot, Java
•	Database: MySQL
•	Authentication: JWT

## Getting Started
•	1. Clone the repository
•	2. Set up the backend (Spring Boot) and frontend (React)
•	3. Configure your MySQL database connection
•	4. Run backend on http://localhost:8080
•	5. Run frontend on http://localhost:5173

## API Endpoints
•	GET /api/events/user - Fetch all events for a user
•	POST /api/events/user - Add new event
•	PUT /api/events/{eventId} - Update event by ID
•	DELETE /api/events/{eventId} - Delete event by ID

## Notes
Make sure to include a valid JWT token in the Authorization header for protected routes.
