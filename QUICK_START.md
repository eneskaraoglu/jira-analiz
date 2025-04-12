# Quick Start Guide - Jira CSV Quality Analyzer

This guide provides a quick overview of how to use the Jira CSV Quality Analyzer application.

## Installation

1. Make sure you have Node.js installed (v14 or higher)
2. Clone or download this repository
3. Run the appropriate script for your operating system:
   - Windows: Double-click `run-project.bat`
   - Mac/Linux: Run `./run-project.sh` in your terminal (you may need to make it executable with `chmod +x run-project.sh`)

## Using the Application

### Step 1: Start the Application

Once the application is running, open your browser and navigate to:
```
http://localhost:3000
```

You'll see the landing page with an overview of the application's features:

![Landing Page]

### Step 2: Upload a Jira CSV

1. Click the "Get Started" button
2. Either drag and drop your Jira CSV file into the drop area or click "Browse Files" to select it from your file system
3. For testing, you can use the sample CSV file located at `backend/sample-jira-export.csv`

![Upload Screen]

### Step 3: Analyze Your Data

Click the "Analyze CSV" button to process your data. The analysis may take a few moments, especially for larger files.

### Step 4: Explore the Results

Once the analysis is complete, you'll see the results dashboard with several sections:

#### Quality Insights
This section provides an overview of the description quality across your Jira tickets, including:
- Overall quality score
- Description length distribution
- Common issues identified
- Improvement tips

![Quality Insights]

#### Creator Performance
This section shows how different team members are performing in terms of description quality:
- Bar charts showing average scores and issue counts
- A ranked table of creators

![Creator Performance]

#### Top Issues
This table shows the highest quality descriptions in your dataset, which can serve as examples of best practices.

### Step 5: Switch to Advanced View

For more detailed analysis, click the "Advanced View" button at the top of the results section. This provides:
- More detailed charts
- Additional metrics
- Improvement recommendations

![Advanced View]

## CSV Requirements

Your Jira CSV export should include at least the following columns:
- `Key` (Issue ID)
- `Summary` (Issue title)
- `Description` (Detailed description)
- `Creator` (Person who created the issue)

## Troubleshooting

If you encounter any issues:

1. Make sure both the frontend and backend are running
2. Check that your CSV file includes all required columns
3. Ensure the CSV is properly formatted (UTF-8 encoding recommended)
4. Check the console for any error messages

For more detailed information, refer to the full [Getting Started Guide](GETTING_STARTED.md).

## AI-Powered Analysis

By default, the application uses a rule-based algorithm to score description quality. For more advanced analysis, you can:

1. Get an OpenAI API key from https://platform.openai.com/
2. Add the key to the `backend/.env` file
3. Restart the application

This will enable AI-powered analysis, which provides more accurate quality scoring based on content, clarity, and completeness.