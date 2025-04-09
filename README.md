# FoodoScope App

A food tracking and nutrition app built with React Native (Expo) and Node.js.

## Project Structure

- `/app` - Frontend React Native application built with Expo
- `/backend` - Node.js, Express, and Prisma backend

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- PostgreSQL database

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.sample`:
   ```
   cp .env.sample .env
   ```

4. Update the PostgreSQL connection string in `.env`:
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5432/foodscopedb?schema=public"
   ```

5. Generate Prisma client:
   ```
   npm run prisma:generate
   ```

6. Run database migrations:
   ```
   npm run prisma:migrate
   ```

7. Start the backend development server:
   ```
   npm run dev
   ```

The backend server will run on http://localhost:5000.

### Frontend Setup

1. Navigate to the main directory:
   ```
   cd ..
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the Expo development server:
   ```
   npx expo start
   ```

4. Run on your device or emulator by following the instructions in the terminal.

## Authentication Flow

The app implements a complete authentication system:

1. User Registration and Email Verification
2. Login with JWT token
3. Protected routes for authenticated users
4. Password recovery flow

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/verify-email` - Verify email with OTP
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with code

### User

- `GET /api/users/profile` - Get authenticated user profile
- `PUT /api/users/profile` - Update user profile

## Features

- **User Authentication**: Register, login, and email verification
- **User Onboarding**: Collect user information about health goals, weight, height, etc.
- **Food Tracking**: Log meals and track nutrition intake
- **Goal Setting**: Set and track fitness and nutrition goals
- **Personalized Recommendations**: Get personalized diet and exercise recommendations

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Zustand
- **Authentication**: JWT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
