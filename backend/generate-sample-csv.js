/**
 * Script to generate a sample CSV file from the sample data
 * This is useful for testing the application without a real Jira export
 */

const fs = require('fs');
const path = require('path');
const { sampleJiraData } = require('./sample-data');

// Function to convert JavaScript objects to CSV
function objectsToCSV(data) {
  // Get the headers (column names) from the first object
  const headers = Object.keys(data[0]);
  
  // Create the CSV header row
  const csvRows = [headers.join(',')];
  
  // Create a row for each object
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header] || '';
      // Quote and escape values that contain commas, quotes, or newlines
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csvRows.push(values.join(','));
  }
  
  // Return the CSV content
  return csvRows.join('\n');
}

// Generate the CSV
const csvContent = objectsToCSV(sampleJiraData);

// Define the output path
const outputPath = path.join(__dirname, 'sample-jira-export.csv');

// Write the file
fs.writeFileSync(outputPath, csvContent);

console.log(`Sample CSV file created at: ${outputPath}`);
