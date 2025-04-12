import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to Jira CSV Quality Analyzer</h1>
        <p className="subtitle">Gain insights into your team's Jira ticket description quality</p>
        
        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Quality Analysis</h3>
            <p>Evaluate description quality with AI-powered analysis</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Creator Performance</h3>
            <p>Track team member performance and identify strengths</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Visual Reports</h3>
            <p>View interactive charts and detailed statistics</p>
          </div>
        </div>
        
        <div className="how-it-works">
          <h2>How It Works</h2>
          <ol className="steps">
            <li>
              <span className="step-number">1</span>
              <div className="step-content">
                <h4>Export CSV from Jira</h4>
                <p>Download a CSV export from your Jira instance</p>
              </div>
            </li>
            <li>
              <span className="step-number">2</span>
              <div className="step-content">
                <h4>Upload Your File</h4>
                <p>Upload the CSV file to our secure analyzer</p>
              </div>
            </li>
            <li>
              <span className="step-number">3</span>
              <div className="step-content">
                <h4>Review Results</h4>
                <p>Explore the insights and improvement opportunities</p>
              </div>
            </li>
          </ol>
        </div>
        
        <button className="get-started-button" onClick={onGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;