# Momentum Installation Guide

## 1. Prerequisites
- Node.js v22 or later
- npm v9 or later (or yarn)
- Git
- MongoDB (if using local database)
- Firebase account and project setup (if using Firebase services)

## 2. Clone the Repository
```bash
git clone [https://github.com/GonzalezEzequiel-FS-1/Momentum.git](https://github.com/GonzalezEzequiel-FS-1/Momentum.git)
cd Momentum
```

## 3. Frontend Setup
```bash
cd dev/FrontEnd
npm install
```

### Environment Variables
Create a `.env` file in `dev/FrontEnd` with the following keys:
```
VITE_DBURL= ***YOUR PRODUCTION URI***
VITE_DBURL_DEV= ***YOUR DEV URI***
```

### Start Frontend Development Server
```bash
npm run dev
```

## 4. Backend Setup
```bash
cd ../Server
npm install
```

### Environment Variables
Create a `.env` file in `dev/Server` with the following keys:
```
DB_URI= ***your_mongo_connection_string***
JWT_SECRET= ***your_jwt_secret***
PORT=3000
```

### Start Backend Server
```bash
npm start
```

## 5. Database Initialization
- For MongoDB local: ensure the database is running.
- For Firebase, make sure your Firebase config matches your `.env` keys.

## 6. Running the App
1. Start backend server (`npm start` in `dev/Server`)
2. Start frontend server (`npm start` in `dev/FrontEnd`)
3. Open browser at `http://localhost:5173`

## 7. Build for Production
```bash
cd dev/FrontEnd
npm run build
```
- Deploy the contents of `dist` folder to your hosting server.

## 8. Troubleshooting
- Port conflicts → change `PORT` in `.env`
- Missing env variables → double-check `.env` file
- MongoDB connection errors → make sure MongoDB server is running
- Firebase connection errors → ensure `.env` keys match Firebase project configuration
