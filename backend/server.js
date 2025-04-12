// server.js - Node.js backend for the CSV analysis application
const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Check if OpenAI API key is configured
const useAI = process.env.OPENAI_API_KEY ? true : false;
let openai;

if (useAI) {
  const { OpenAI } = require('openai');
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

// Middleware
app.use(cors());
app.use(express.json());

// API route for CSV analysis
app.post('/api/analyze', upload.single('csvFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const results = [];

    // Parse CSV file
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          // Process the parsed data
          const analyzedData = await analyzeJiraData(results);
          
          // Delete the uploaded file
          fs.unlinkSync(req.file.path);
          
          // Send back the analysis results
          res.json(analyzedData);
        } catch (err) {
          console.error('Error analyzing data:', err);
          res.status(500).json({ error: 'Failed to analyze data' });
        }
      })
      .on('error', (err) => {
        console.error('Error parsing CSV:', err);
        res.status(500).json({ error: 'Failed to parse CSV file' });
      });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Function to analyze the Jira data
async function analyzeJiraData(data) {
  // Extract relevant fields
  const issues = data.map(item => ({
    key: item.Key || '',
    summary: item.Summary || '',
    description: item.Description || '',
    creator: item.Creator || '',
    created: item.Created || '',
  }));

  // Analyze descriptions and assign scores
  const analyzedIssues = await Promise.all(
    issues.map(async issue => {
      const score = await analyzeDescription(issue.summary, issue.description);
      return {
        ...issue,
        score
      };
    })
  );

  // Aggregate statistics by creator
  const creatorMap = {};
  analyzedIssues.forEach(issue => {
    if (!creatorMap[issue.creator]) {
      creatorMap[issue.creator] = {
        creator: issue.creator,
        totalScore: issue.score,
        issueCount: 1
      };
    } else {
      creatorMap[issue.creator].totalScore += issue.score;
      creatorMap[issue.creator].issueCount += 1;
    }
  });

  // Calculate average scores for each creator
  const creatorStats = Object.values(creatorMap).map(creator => ({
    creator: creator.creator,
    averageScore: creator.totalScore / creator.issueCount,
    issueCount: creator.issueCount
  }));

  // Sort by average score in descending order
  creatorStats.sort((a, b) => b.averageScore - a.averageScore);

  // Get top issues by quality
  const topIssues = [...analyzedIssues]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return {
    creatorStats,
    topIssues,
    totalIssues: analyzedIssues.length
  };
}

// Function to analyze a description using AI
async function analyzeDescription(summary, description) {
  // Using AI if OpenAI API key is configured
  if (useAI) {
    try {
      // Make AI API call to evaluate description quality
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert in evaluating the quality of Jira ticket descriptions. Score from 0-10 based on clarity, completeness, structure, and technical details. Return only a number."
          },
          {
            role: "user",
            content: `Evaluate this Jira ticket (scale 0-10):\nSummary: ${summary}\nDescription: ${description}`
          }
        ],
        temperature: 0.3,
        max_tokens: 10,
      });

      // Extract score from response
      const scoreText = response.choices[0].message.content.trim();
      const score = parseFloat(scoreText);
      
      return isNaN(score) ? 5 : score; // Default to 5 if parsing fails
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      // Fallback scoring method
      return fallbackScoring(summary, description);
    }
  } else {
    // Use fallback scoring method if AI is not configured
    return fallbackScoring(summary, description);
  }
}

// Fallback scoring method without AI
function fallbackScoring(summary, description) {
  // Simple algorithm - calculate score based on description length and complexity
  const baseScore = Math.min(description.length / 100, 7); // Max 7 points for length
  const hasFormatting = /\n/.test(description) ? 1 : 0; // 1 point for formatting
  const hasTechnicalTerms = /\b(api|database|config|server|function|method|class|object|component|module)\b/i.test(description) ? 1 : 0; // 1 point for technical terms
  const qualitySummary = summary.length > 15 ? 1 : 0; // 1 point for decent summary
  
  return Math.min(baseScore + hasFormatting + hasTechnicalTerms + qualitySummary, 10);
}

// Production: Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;