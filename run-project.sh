#!/bin/bash

echo "==================================="
echo "Jira CSV Quality Analyzer - Startup"
echo "==================================="
echo

echo "Installing root dependencies..."
npm install

echo
echo "Installing backend dependencies..."
cd backend
npm install

echo
echo "Installing frontend dependencies..."
cd ../frontend
npm install
cd ..

echo
echo "Starting the application..."
echo
echo "The application will start in development mode."
echo "- Backend: http://localhost:5000"
echo "- Frontend: http://localhost:3000"
echo
echo "Press Ctrl+C to stop the application."
echo

npm run dev