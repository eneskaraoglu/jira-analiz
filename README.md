# Jira CSV Quality Analyzer

An application that analyzes Jira CSV exports to evaluate description quality and creator performance.

## Features

- Upload Jira CSV files via a user-friendly interface
- AI-powered analysis of description quality
- Performance rankings by creator
- Visual charts and tables for easy interpretation

## Project Structure

```
jira-analiz/
├── frontend/           # React frontend application
│   ├── public/         # Static files
│   ├── src/            # React components and styles
│   └── package.json    # Frontend dependencies
├── backend/            # Node.js Express backend
│   ├── server.js       # Main server file
│   ├── package.json    # Backend dependencies
│   └── .env.example    # Example environment variables
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory.

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file to add your OpenAI API key if you want to use AI for analysis.

4. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Upload a Jira CSV file by dragging and dropping or using the file browser.
2. Click the "Analyze CSV" button.
3. View the analysis results in the charts and tables.

## CSV Format Requirements

The application expects a Jira CSV export with at least the following columns:
- Key (Issue ID)
- Summary (Issue title)
- Description (Issue detailed description)
- Creator (Person who created the issue)

## AI Analysis

The backend can use OpenAI's API to analyze description quality. To enable this:
1. Get an API key from OpenAI.
2. Add it to your `.env` file.

Without an API key, the application will use a simpler rule-based algorithm for scoring.

## Building for Production

### Frontend:
```bash
cd frontend
npm run build
```

### Backend:
Set `NODE_ENV=production` in your `.env` file.

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.