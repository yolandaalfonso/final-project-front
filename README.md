# Triply - Travel Social Network

Triply is a social network platform designed for travel enthusiasts to share and manage their travel experiences. Built as the final project for a Full Stack Development Bootcamp, it allows users to document their journeys, upload photos, and explore trips from fellow travelers around the world.

The backend is powered by Java Spring Boot, ensuring a reliable and robust infrastructure. Firebase Authentication is used to manage user sessions securely, allowing users to register, log in, and manage their profiles.

## Key Features

**Trip Management**: Users can create, edit, and delete their travel experiences. Each trip includes detailed information such as destination, dates, descriptions, and photo galleries.

**Photo Upload**: Integrated with Firebase Storage, users can upload and manage multiple photos for each trip, creating rich visual stories of their adventures.

**Social Feed**: Browse and explore trips shared by other users. Discover new destinations and get inspired by the travel experiences of the Triply community.

**User Profiles**: Each user has a dedicated profile section where they can manage their personal information, view their trip history, and showcase their travel portfolio.

**Search and Discovery**: Users can search for trips by destination, explore featured travels, and discover new places through the community's shared experiences.

**Responsive Design**: Built with React and modern CSS, the platform provides a seamless experience across various devices, including desktops, tablets, and smartphones.

**Secure Authentication**: Firebase Authentication ensures secure user registration and login, protecting user data and maintaining privacy.

By leveraging modern web technologies such as Spring Boot for the backend and React for the frontend, Triply provides a comprehensive, secure, and user-friendly platform for travel enthusiasts to share their adventures and connect with like-minded explorers.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Setup](#project-setup)
- [User Flow](#user-flow)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Screenshots](#screenshots)
- [Tools & Technologies](#tools--technologies)
- [Known Issues](#known-issues)
- [Future Improvements](#future-improvements)
- [Contributors](#contributors)
- [Backend Repository](#backend-repository)
- [Disclaimer](#disclaimer)

## Prerequisites

Before running this project, ensure you have the following installed on your machine:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **Firebase Account** (for authentication and storage)
- **Git**

## Installation

Instructions on how to install and set up the project.

```bash
git clone https://github.com/yolandaalfonso/final-project-front.git
cd final-project-front
```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```properties
# API endpoint URL
VITE_API_BASE_URL=http://localhost:8080/api

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password method)
3. Enable Firebase Storage for image uploads
4. Copy your Firebase configuration credentials
5. Add these credentials to your `.env` file as shown above

This configuration is required for user authentication and image storage functionality.

## Project Setup

Install all dependencies:

```bash
npm install
```

### Compile and Hot-Reload for Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint with ESLint

```bash
npm run lint
```

## User Flow

<!-- Add user flow diagram here -->
*User flow diagram coming soon*

## Project Structure

Below is an overview of the main directories and files in the Triply project:

```
final-project-front/
├── public/                     # Public static files
├── src/                        # Main application source code
│   ├── components/            # React components
│   │   ├── button/           # Button component
│   │   ├── exploreTripCard/  # Card for exploring trips
│   │   ├── feedCard/         # Feed card component
│   │   ├── footer/           # Footer component
│   │   ├── headerPrivate/    # Private area header
│   │   ├── headerPublic/     # Public area header
│   │   ├── hero/             # Hero section component
│   │   ├── imageCard/        # Image card component
│   │   ├── inicalCard/       # Initial card component
│   │   ├── styles/           # Component styles
│   │   ├── successModal/     # Success modal component
│   │   └── tripCard/         # Trip card component
│   ├── context/              # React Context for state management
│   ├── firebase/             # Firebase configuration and services
│   ├── layout/               # Layout components
│   ├── pages/                # Page components/views
│   ├── repositories/         # API repositories
│   ├── routes/               # Route configuration
│   ├── services/             # Business logic services
│   ├── utils/                # Utility functions
│   ├── App.jsx               # Root React component
│   ├── App.css               # Global styles
│   ├── index.css             # Base styles
│   └── main.jsx              # Application entry point
├── .env                       # Environment variables (not in repo)
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore file
├── eslint.config.js           # ESLint configuration
├── index.html                 # Main HTML file
├── package.json               # Project dependencies and scripts
├── package-lock.json          # Lock file for npm dependencies
├── README.md                  # Project documentation
├── vite.config.js             # Vite configuration
└── vitest.config.js           # Vitest configuration
```

## Running Tests

To ensure everything is working as expected, you can run the unit and integration tests included in the project.

### Run All Tests

```bash
npm run test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Tests with UI

```bash
npm run test:ui
```

This will automatically run all the tests, validating the functionality of the different components and services.

**Important Notes:**
- Make sure your backend API is properly set up and running if your tests depend on API interactions
- Ensure Firebase is correctly configured for authentication tests
- The test results will be displayed in the terminal
- Coverage reports will be generated in the `coverage/` folder

Running the tests regularly helps ensure that new changes do not break existing functionality and keeps the codebase reliable.

## Screenshots

<!-- Add your screenshots here -->

### Home
*Screenshot coming soon*

### Trip Feed
*Screenshot coming soon*

### Trip Details
*Screenshot coming soon*

### User Profile
*Screenshot coming soon*

### Create/Edit Trip
*Screenshot coming soon*

## Tools & Technologies

### Frontend
- **React 19** - UI library
- **React Router DOM** - Navigation and routing
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form validation and management
- **CSS3** - Styling

### Backend Integration
- **Firebase Authentication** - User authentication
- **Firebase Storage** - Image and file storage
- **REST API** - Communication with Spring Boot backend

### Testing
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing
- **@vitest/ui** - Visual test interface
- **@vitest/coverage-v8** - Code coverage reports

### Development Tools
- **ESLint** - Code linting
- **Git** - Version control

### Backend
- **Java Spring Boot** - Backend framework
- **JWT** - Token-based authentication
- **PostgreSQL** - Database (check backend repo for details)

## Known Issues

### Known Issues

- **Issue 1**: Profile image upload may fail with large files (>5MB). Consider implementing file size validation.

- **Issue 2**: Trip search functionality is limited to exact matches. Fuzzy search implementation is planned.

Feel free to open an issue if you encounter something not listed here.

## Future Improvements

Here are some planned features or improvements for future versions of the project:

- **Advanced Search**: Implement filters by date, location, tags, and user ratings
- **Social Features**: Add likes, comments, and the ability to follow other users
- **Trip Recommendations**: AI-powered travel suggestions based on user preferences
- **Map Integration**: Interactive maps showing trip locations using Google Maps API
- **Mobile App**: Native mobile applications for iOS and Android
- **Multi-language Support**: Internationalization (i18n) for global reach
- **Trip Collaboration**: Allow multiple users to contribute to shared trips
- **Export Functionality**: Export trips as PDF or share on social media
- **Dark Mode**: Theme switching capability
- **Offline Mode**: PWA implementation for offline access

## Contributors

**Frontend Development:**
- Yolanda Alfonso - [GitHub Profile](https://github.com/yolandaalfonso)

## Backend Repository

**Backend Repository**: [Triply Backend](https://github.com/yolandaalfonso/final-project-back)

The backend is built with Java Spring Boot and handles:
- User authentication and authorization
- Trip CRUD operations
- Image metadata management
- Database operations
- API endpoints for frontend integration

## Disclaimer

This project is developed as part of a Full Stack Development Bootcamp and is intended for **educational purposes only**. The creators and contributors are not responsible for any issues, damages, or losses that may occur from using this code.

This project is **not meant for commercial use**. By using this code, you acknowledge that it is a work in progress, created as a learning project, and comes without warranties or guarantees of any kind.

Use at your own discretion and risk.
