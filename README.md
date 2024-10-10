# Hotel Room Booking System

## Project Description

The goal of this project is to create a backend system to manage room bookings in a hotel. This application allows users to book rooms, view room availability, and provides a basic user system with different roles (admin and customer). Admin users can manage room availability, while regular customers can view available rooms and make bookings. Additionally, Redis caching is implemented for room availability.

## Key Features

1. **Room Availability**: Users can check the availability of rooms for a given date range.
2. **Room Classification**: The system supports different room types such as Basic, Premium, and Suite.
3. **User System**: Basic user authentication and authorization system with roles (admin and customer).
4. **User Roles**:
   - **Admin**: Can create, edit, and delete rooms, manage availability, and view all bookings.
   - **Customer**: Can only view available rooms and make bookings.
5. **Booking**: Functionality to create and manage room bookings.
6. **Redis Caching**: Room availability is cached using Redis for improved performance.

## Technologies Used

- **Backend Framework**: Express (Node.js)
- **Database**: MongoDB
- **Authentication**: JWT Token-based authentication (Bearer tokens)
- **Caching**: Redis (for caching room availability)
- **Testing**: Postman

## Project Structure

```
|—— .babelrc
|—— .env
|—— .env_sample
|—— .gitignore
|—— api
|    |—— app.js
|    |—— config
|        |—— db.js
|    |—— controllers
|        |—— authController.js
|        |—— bookingController.js
|        |—— roomController.js
|    |—— helpers
|        |—— redis.js
|        |—— token.js
|    |—— middlewares
|        |—— authorization.js
|        |—— notFound.js
|    |—— models
|        |—— bookingModel.js
|        |—— roomModel.js
|        |—— userModel.js
|    |—— routes
|        |—— auth.js
|        |—— booking.js
|        |—— index.js
|        |—— room.js
|    |—— services
|        |—— authService.js
|        |—— bookingService.js
|        |—— roomService.js
|    |—— validations
|        |—— authValidation.js
|        |—— bookingValidation.js
|        |—— roomValidation.js
|—— package-lock.json
|—— package.json
|—— postman_collection
|    |—— Hotel-Room-Management.postman_collection.json
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/hotel-room-booking-system.git
   ```
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   - Create a `.env` file using `.env_sample` as a reference.
   - Add your MongoDB URI, JWT secret, and Redis configurations.

4. Run the application in development mode:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user.
- **POST** `/api/auth/login` - Log in a user and generate a JWT token.

### Rooms

- **GET** `/api/rooms/getAllRooms` - Admin can fetch all rooms.
- **POST** `/api/rooms/getAllAvailableRoomsByDate` - Fetch available rooms within a date range (uses Redis caching).
- **POST** `/api/rooms/createRoom` - Admin can create a new room.
- **PUT** `/api/rooms/updateRoom/:id` - Admin can update an existing room.
- **DELETE** `/api/rooms/deleteRoom/:id` - Admin can delete a room.
- **GET** `/api/rooms/getRoomTypes` - Fetch all room types.
- **GET** `/api/rooms/getAvailableRoomsByType/:type` - Fetch available rooms by type.

### Bookings

- **GET** `/api/bookings/getAllBookings` - Admin can view all bookings.
- **GET** `/api/bookings/getBookingById/:id` - Fetch a specific booking by ID.
- **POST** `/api/bookings/createBooking` - Admin can create a new booking.
- **PUT** `/api/bookings/updateBooking/:id` - Admin can update an existing booking.
- **DELETE** `/api/bookings/deleteBooking/:id` - Admin can delete a booking.

## Models

### Room Model

- **number**: Unique room number.
- **type**: Room type (Basic, Premium, Suite).
- **price**: Price of the room.
- **quantity**: Number of rooms available.
- **isAvailable**: Availability status of the room.
- **availableDates**: Dates when the room is available for booking.

### Booking Model

- **user**: The user who made the booking (populated with the `User` model).
- **room**: The room being booked (populated with the `Room` model).
- **startDate**: The start date of the booking.
- **endDate**: The end date of the booking.

### User Model

- **name**: Name of the user.
- **email**: User's email address.
- **password**: User's hashed password.
- **role**: Role of the user (`admin` or `customer`).

## Usage

1. **Register** a user using the `/auth/register` endpoint.
2. **Log in** using `/auth/login` to obtain a JWT token.
3. Use the token to access protected routes:
   - Admin users can manage rooms and bookings.
   - Regular customers can view room availability and book rooms.

## Scripts

- **`npm run dev`**: Runs the application in development mode using `nodemon`.

## Bonus

This project implements Redis caching to optimize performance when fetching room availability data.
