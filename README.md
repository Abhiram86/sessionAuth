# Express Authentication APIMore actions

A robust Node.js/Express.js REST API with user authentication, session management, and security features.

## Features

- **User Authentication**: Register and login with username/email
- **Session Management**: Secure session-based authentication
- **Password Security**: Bcrypt hashing with salt
- **Input Validation**: Zod schema validation
- **Rate Limiting**: Protection against brute force attacks
- **CORS Support**: Cross-origin resource sharing configuration
- **MongoDB Integration**: Database connectivity and user management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: bcrypt, express-session
- **Validation**: Zod
- **Security**: express-rate-limit, CORS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Abhiram86/sessionAuth.git
cd sessionAuth
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
SESSION_SECRET=your-session-secret-key
MONGODB_URI=your-mongodb-connection-string
PORT=8080
```

4. Start the server:

```bash
npm start
# or for development
npm run dev
```

## API Endpoints

### Authentication Routes (`/auth`)

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "username": "string (min 4 chars)",
  "email": "valid-email@example.com",
  "password": "string (min 8 chars)"
}
```

#### Login User

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com", // or use username
  "password": "userpassword"
}
```

#### Logout User

```http
POST /auth/logout
```

### User Routes

#### Get Current User

```http
GET /getUser
```

Returns the currently authenticated user's information.

### Additional Routes

- `/common` - Common utility routes (anyone can access so it is `rate limited`)
- `/dashboard` - Dashboard-specific routes (`protected route`)

## Security Features

### Rate Limiting

- **Window**: 20 seconds
- **Max Requests**: 10 per IP
- **Response**: "Too many requests from this IP, please try again later"

### Session Configuration

- **Duration**: 5 minutes
- **HTTP Only**: Prevents XSS attacks
- **Same Site**: CSRF protection
- **Secure**: Configurable for HTTPS

### CORS Policy

- **Origin**: `http://localhost:3000` (configurable)
- **Credentials**: Enabled for session cookies

## Validation Rules

### Registration

- Username: Minimum 4 characters
- Email: Valid email format
- Password: Minimum 8 characters

### Login

- Either email OR username required (not both)
- Password: Minimum 8 characters

## Error Handling

The API returns structured error responses:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:

- `200` - Success
- `201` - Created (registration)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Project Structure

```
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   └── user.auth.js       # Authentication controllers
├── middleware/
│   └── auth.js            # Validation middleware
│   └── common.js
│   └── dashboard.js
├── models/
│   └── user.js            # User model
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── common.js          # Common routes
│   └── dashboard.js       # Dashboard routes
└── server.js              # Main application file
└── index.js              # Main application file
```

## Development

### Running in Development Mode

```bash
npm run dev
```

### Environment Variables

Make sure to set up your environment variables in `.env`:

- `SESSION_SECRET`: Secret key for session encryption
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 8080)
