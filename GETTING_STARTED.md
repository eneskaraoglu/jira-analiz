# Getting Started with the Jira CSV Quality Analyzer

This guide will help you set up and run the application on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn

## Installation Steps

1. **Install the root dependencies**

   From the root directory, run:
   ```bash
   npm install
   ```

2. **Install backend dependencies**

   Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   Navigate to the frontend directory:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**

   In the backend directory, copy the `.env.example` file to `.env`:
   ```bash
   cd ../backend
   cp .env.example .env
   ```
   
   Then open the `.env` file and set the following variables:
   - `PORT`: The port for the backend server (default: 5000)
   - `OPENAI_API_KEY`: Your OpenAI API key (optional - enables AI-powered analysis)
   - `NODE_ENV`: Set to "development" for local development

## Running the Application

You can run both the frontend and backend together, or run them separately.

### Running Both Together

From the root directory, run:
```bash
npm run dev
```

This will start both the backend server and the React development server.

### Running Separately

**Backend:**
```bash
cd backend
npm run dev
```

The backend will run on http://localhost:5000 by default.

**Frontend:**
```bash
cd frontend
npm start
```

The frontend will run on http://localhost:3000 by default.

## Testing with Sample Data

This application includes a sample Jira CSV file for testing purposes:

1. Start the application
2. Use the "Browse Files" button to select the sample CSV file located at `backend/sample-jira-export.csv`
3. Click "Analyze CSV" to process the sample data

## Troubleshooting

**Backend won't start:**
- Check if the port specified in the `.env` file is already in use
- Make sure all dependencies are installed
- Check the console for specific error messages

**Frontend can't connect to backend:**
- Ensure the backend is running
- Check that the proxy setting in `frontend/package.json` matches the backend URL
- Verify CORS settings in the backend are configured correctly

**File upload errors:**
- Make sure the CSV file has the required columns (Key, Summary, Description, Creator)
- Check that the `uploads` directory exists in the backend folder and is writable

## Building for Production

To build the application for production:

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Set the backend environment to production:
   ```bash
   # In backend/.env
   NODE_ENV=production
   ```

3. Start the production server:
   ```bash
   cd ../backend
   npm start
   ```

The application will be served from the backend at http://localhost:5000 (or your configured PORT).