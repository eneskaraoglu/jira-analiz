import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import './App.css';
import LandingPage from './components/LandingPage';
import AdvancedDashboard from './components/AdvancedDashboard';
import QualityInsights from './components/QualityInsights';
import './components/AdvancedDashboard.css';
import './components/QualityInsights.css';

function App() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [advancedView, setAdvancedView] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      setFile(droppedFile);
      setError(null);
    } else {
      setError('Please drop a CSV file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('csvFile', file);

    try {
      const response = await axios.post('/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResults(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze the file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetStarted = () => {
    setShowUpload(true);
  };

  const toggleView = () => {
    setAdvancedView(!advancedView);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Jira CSV Quality Analyzer</h1>
        <p>Upload your Jira CSV file to analyze description quality and creator performance</p>
      </header>
      
      {!showUpload && !results && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}

      <main>
        {(showUpload || file || results) && (
          <section className="upload-section">
            <div 
              className="drop-area" 
              onDragOver={handleDragOver} 
              onDrop={handleDrop}
            >
              <div className="drop-content">
                <i className="file-icon">📄</i>
                <p>Drag & drop your CSV file here</p>
                <p className="or-text">- or -</p>
                <input 
                  type="file" 
                  id="fileInput" 
                  accept=".csv" 
                  onChange={handleFileChange} 
                  className="file-input"
                />
                <label htmlFor="fileInput" className="file-label">
                  Browse Files
                </label>
                {file && <p className="selected-file">Selected: {file.name}</p>}
              </div>
            </div>

            <button 
              className="analyze-button" 
              onClick={handleSubmit}
              disabled={isLoading || !file}
            >
              {isLoading ? 'Analyzing...' : 'Analyze CSV'}
            </button>

            {error && <p className="error-message">{error}</p>}
          </section>
        )}

        {isLoading && (
          <section className="loading-section">
            <div className="loading-spinner"></div>
            <p>Analyzing your CSV file...</p>
          </section>
        )}

        {results && (
          <section className="results-section">
            <h2>Analysis Results</h2>
            
            <div className="view-toggle">
              <button 
                className={`view-button ${!advancedView ? 'active' : ''}`} 
                onClick={() => setAdvancedView(false)}
              >
                Basic View
              </button>
              <button 
                className={`view-button ${advancedView ? 'active' : ''}`} 
                onClick={() => setAdvancedView(true)}
              >
                Advanced View
              </button>
            </div>
            
            {advancedView ? (
              <AdvancedDashboard data={results} />
            ) : (
              <div>
                <QualityInsights data={results} />
                
                <div className="results-container">
                  <div className="chart-container">
                    <h3>Creator Performance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={results.creatorStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="creator" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="averageScore" fill="#8884d8" name="Avg. Description Score" />
                        <Bar dataKey="issueCount" fill="#82ca9d" name="Issue Count" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="table-container">
                    <h3>Creator Rankings</h3>
                    <table className="results-table">
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Creator</th>
                          <th>Avg. Score</th>
                          <th>Issues Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.creatorStats.map((creator, index) => (
                          <tr key={creator.creator}>
                            <td>{index + 1}</td>
                            <td>{creator.creator}</td>
                            <td>{creator.averageScore.toFixed(2)}</td>
                            <td>{creator.issueCount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="issues-table-container">
                  <h3>Top Issues By Quality</h3>
                  <table className="results-table issues-table">
                    <thead>
                      <tr>
                        <th>Key</th>
                        <th>Summary</th>
                        <th>Creator</th>
                        <th>Description Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.topIssues.map((issue) => (
                        <tr key={issue.key}>
                          <td>{issue.key}</td>
                          <td>{issue.summary}</td>
                          <td>{issue.creator}</td>
                          <td>{issue.score.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;