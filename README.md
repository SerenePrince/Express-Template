# Express Project Template

This is a simple, clean, and flexible **Express.js** template designed to quickly get your Node.js projects up and running. It comes preconfigured with essential features such as user authentication, rate limiting, MongoDB connection, admin user initialization, and more. This template is ideal for creating corporate tools, internal apps, or APIs.

## Features

- User authentication with JWT and password hashing
- Rate limiting for general and sensitive routes
- MongoDB connection using Mongoose
- Secure header protection with Helmet
- Easy-to-use and extendable user and auth controllers/services
- Admin user initialization on setup
- CORS support with customizable options
- Secure cookie-based authentication with JWT

---

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Available Routes](#available-routes)
- [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Installation

To get started with this template, follow these steps:

### Prerequisites

Ensure that you have the following installed:

- **Node.js** (version 14 or higher)
- **MongoDB** (either locally or through a cloud provider like MongoDB Atlas)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SerenePrince/Express-Template.git
   cd express-template
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Copy the `.env.example` file and rename it to `.env`:

   ```bash
   cp .env.example .env
   ```

   Open the `.env` file and fill in the following details:

   - `PORT`: The port your app will run on (default: `4000`).
   - `MONGO_DB_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A strong secret key for signing JWT tokens.
   - `JWT_EXPIRATION`: The expiration time for the JWT tokens (e.g., `1h` for 1 hour).
   - `FRONTEND_URL`: The URL of your frontend application for CORS configuration.
   - `RATE_LIMIT_GENERAL`: Rate limit for general routes (e.g., login attempts).
   - `RATE_LIMIT_SENSITIVE`: Rate limit for sensitive routes (e.g., auth-related routes).
   - `ADMIN_EMAIL`: The email address for the initial admin user.
   - `ADMIN_PASSWORD`: The password for the initial admin user.

4. **Start the server:**

   Once the `.env` file is configured, you can run the app locally by starting the server:

   ```bash
   npm start
   ```

   The server will start on the port you specified in the `.env` file (default: `4000`).

---

## Configuration

This template comes with several default configurations that are ready to use, including:

- **CORS**: Customizable options to allow or restrict access from different origins.
- **Rate Limiting**: You can configure the number of requests allowed for general routes (e.g., `/login`) and sensitive routes (e.g., `/api/users`).
- **JWT Authentication**: Out-of-the-box support for generating and verifying JWT tokens. Tokens are stored in HTTP-only cookies for security.

---

## Project Structure

Here’s an overview of the directory structure:

```
├── config
│   └── db.js                    # MongoDB connection setup
├── controllers
│   ├── authController.js         # Authentication routes (signup, login, logout)
│   └── userController.js         # User management routes (CRUD operations)
├── middleware
│   ├── corsOptions.js            # Custom CORS options
│   ├── limiter.js                # Rate limiting middleware
│   ├── requireAdmin.js           # Admin access control middleware
│   └── requireAuth.js            # User authentication middleware
├── models
│   └── user.js                   # User model schema
├── routes
│   ├── authRoutes.js             # Authentication routes (signup, login, logout)
│   └── userRoutes.js             # User management routes
├── services
│   ├── authService.js            # Authentication logic (signup, login, JWT generation)
│   └── userService.js            # User management logic (CRUD operations)
├── utils
│   ├── initAdmin.js              # Admin account initialization
│   └── logger.js                 # Custom logger for the application
├── .env.example                  # Example .env file with configuration details
├── app.js                        # Express app setup (routes, middleware, etc.)
├── server.js                     # Main entry point to run the app
├── package.json                  # Project dependencies and scripts
└── README.md                     # Documentation
```

---

## Available Routes

### Authentication Routes

- **POST /api/auth/signup**

  - Create a new user.
  - Requires: `email`, `password`, `role` (optional).

- **POST /api/auth/login**

  - Login and get a JWT token.
  - Requires: `email`, `password`.

- **POST /api/auth/logout**
  - Logs the user out by clearing the JWT cookie.

### User Routes

- **GET /api/users**

  - Get all users. (Admin access only)

- **GET /api/users/:id**

  - Get a single user by ID. (Authenticated users can access their own info)

- **POST /api/users**

  - Create a new user. (Admin access only)

- **PUT /api/users/:id**

  - Update user details. (Admin access only)

- **DELETE /api/users/:id**
  - Delete a user. (Admin access only)

---

## Running Locally

To run the server locally, follow these steps:

1. Ensure you have **MongoDB** running locally or use a cloud service like **MongoDB Atlas**.
2. Clone the repository and configure the `.env` file.
3. Run the following command to start the server:

   ```bash
   npm start
   ```

   The server will be available at `http://localhost:4000` (or the port you configured in `.env`).

---

## Environment Variables

Make sure to configure the following environment variables in your `.env` file:

| Variable               | Description                                            | Example                                |
| ---------------------- | ------------------------------------------------------ | -------------------------------------- |
| `PORT`                 | Port the server will run on                            | `4000`                                 |
| `MONGO_DB_URI`         | MongoDB connection string (local or cloud)             | `mongodb://localhost:27017/mydatabase` |
| `NODE_ENV`             | Environment type (`development`, `production`, `test`) | `development`                          |
| `JWT_SECRET`           | Secret key for signing JWT tokens                      | `your_jwt_secret_key`                  |
| `JWT_EXPIRATION`       | Expiration time for JWT tokens                         | `3600` (1 hour)                        |
| `FRONTEND_URL`         | URL of your frontend app                               | `http://localhost:3000`                |
| `RATE_LIMIT_GENERAL`   | Rate limit for general routes (e.g., login attempts)   | `100`                                  |
| `RATE_LIMIT_SENSITIVE` | Rate limit for sensitive routes (e.g., `/api/users`)   | `10`                                   |
| `ADMIN_EMAIL`          | Email of the initial admin account                     | `admin@yourdomain.com`                 |
| `ADMIN_PASSWORD`       | Password of the initial admin account                  | `admin_password`                       |

---

## License

This project is licensed under the MIT License
