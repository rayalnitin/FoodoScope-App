# FoodoScope App

FoodoScope is a mobile application that helps users track their food intake, fitness goals, and overall health metrics.

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

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/FoodoScope-App.git
cd FoodoScope-App
```

2. Install dependencies for the frontend
```bash
npm install
# or
yarn install
```

3. Install dependencies for the backend
```bash
cd backend
npm install
# or
yarn install
```

4. Set up environment variables
   - Copy `.env.sample` to `.env` in the backend directory
   - Update the variables with your own values

5. Set up the database
```bash
cd backend
npx prisma migrate dev
```

### Running the App

1. Start the backend server
```bash
cd backend
npm run dev
# or
yarn dev
```

2. Start the frontend app
```bash
# In the root directory
npm start
# or
yarn start
```

## API Documentation

### Authentication Routes

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/verify-email`: Verify email with OTP
- `POST /api/auth/login`: Login user

### User Routes

- `GET /api/users/profile`: Get user profile
- `PUT /api/users/profile`: Update user profile

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
