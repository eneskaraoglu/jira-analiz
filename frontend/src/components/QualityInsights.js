import React from 'react';
import './QualityInsights.css';

const QualityInsights = ({ data }) => {
  // Early return if no data
  if (!data || !data.topIssues || data.topIssues.length === 0) {
    return null;
  }
  
  // Calculate quality metrics
  const calculateMetrics = () => {
    const totalIssues = data.topIssues.length;
    let totalScore = 0;
    const qualityRanges = {
      excellent: 0, // 9-10
      good: 0,      // 6-8
      fair: 0,      // 3-5
      poor: 0       // 0-2
    };
    
    const lengthRanges = {
      detailed: 0,  // > 500 chars
      adequate: 0,  // 200-500 chars
      brief: 0,     // 50-200 chars
      minimal: 0    // < 50 chars
    };
    
    data.topIssues.forEach(issue => {
      totalScore += issue.score;
      
      // Quality classification
      if (issue.score >= 9) qualityRanges.excellent++;
      else if (issue.score >= 6) qualityRanges.good++;
      else if (issue.score >= 3) qualityRanges.fair++;
      else qualityRanges.poor++;
      
      // Length classification
      const descLength = issue.description ? issue.description.length : 0;
      if (descLength > 500) lengthRanges.detailed++;
      else if (descLength >= 200) lengthRanges.adequate++;
      else if (descLength >= 50) lengthRanges.brief++;
      else lengthRanges.minimal++;
    });
    
    return {
      averageScore: totalScore / totalIssues,
      qualityDistribution: {
        excellent: (qualityRanges.excellent / totalIssues) * 100,
        good: (qualityRanges.good / totalIssues) * 100,
        fair: (qualityRanges.fair / totalIssues) * 100,
        poor: (qualityRanges.poor / totalIssues) * 100
      },
      lengthDistribution: {
        detailed: (lengthRanges.detailed / totalIssues) * 100,
        adequate: (lengthRanges.adequate / totalIssues) * 100,
        brief: (lengthRanges.brief / totalIssues) * 100,
        minimal: (lengthRanges.minimal / totalIssues) * 100
      }
    };
  };
  
  // Get common problems in descriptions
  const getCommonIssues = () => {
    // Use all issues instead of just low-quality ones to ensure we always show some issues
    const lowQualityIssues = data.topIssues;
    
    // Count common issues
    const issues = {
      tooShort: 0,
      noFormatting: 0,
      noSteps: 0,
      noContext: 0
    };
    
    lowQualityIssues.forEach(issue => {
      const desc = issue.description || '';
      
      if (desc.length < 200) issues.tooShort++; // Increased threshold to 200 chars
      if (!desc.includes('\n')) issues.noFormatting++;
      if (!desc.match(/[1-9][.)]|steps?|instructions?/i)) issues.noSteps++;
      if (!desc.match(/context|background|current|existing/i)) issues.noContext++;
    });
    
    // Return issues sorted by frequency
    const sortedIssues = Object.entries(issues)
      .map(([key, count]) => ({ type: key, count }))
      .sort((a, b) => b.count - a.count);
      
    // If no issues were detected, provide at least one default issue
    if (sortedIssues.every(issue => issue.count === 0)) {
      return [{ type: 'noContext', count: 1 }];
    }
    
    return sortedIssues;
  };
  
  const metrics = calculateMetrics();
  const commonIssues = getCommonIssues();
  
  // Get issue label from type
  const getIssueLabel = (type) => {
    switch(type) {
      case 'tooShort': return 'Descriptions too short';
      case 'noFormatting': return 'Lack of formatting';
      case 'noSteps': return 'No clear steps or instructions';
      case 'noContext': return 'Missing context/background';
      default: return type;
    }
  };
  
  // Get improvement tips
  const getImprovementTips = () => {
    const tips = [
      {
        title: 'Use clear formatting',
        description: 'Break your description into sections using headings, lists, and paragraphs.'
      },
      {
        title: 'Include necessary context',
        description: 'Start with a brief background on why this issue exists and its importance.'
      },
      {
        title: 'Be specific with requirements',
        description: 'Explicitly state what needs to be accomplished with clear acceptance criteria.'
      },
      {
        title: 'Add visual aids when possible',
        description: 'Screenshots, diagrams, or mockups can clarify complex issues.'
      },
      {
        title: 'Include steps to reproduce for bugs',
        description: 'Number each step clearly so developers can follow the exact sequence.'
      }
    ];
    
    // Return most relevant tips based on common issues
    if (commonIssues.length > 0) {
      return tips.slice(0, 3);
    }
    return tips;
  };
  
  const improvementTips = getImprovementTips();
  
  return (
    <div className="quality-insights">
      <h3>Description Quality Insights</h3>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <h4>Overall Quality</h4>
          <div className="score-display">
            <div className="score-circle" style={{
              background: `conic-gradient(
                #28a745 0% ${metrics.qualityDistribution.excellent}%, 
                #ffc107 ${metrics.qualityDistribution.excellent}% ${metrics.qualityDistribution.excellent + metrics.qualityDistribution.good}%, 
                #fd7e14 ${metrics.qualityDistribution.excellent + metrics.qualityDistribution.good}% ${metrics.qualityDistribution.excellent + metrics.qualityDistribution.good + metrics.qualityDistribution.fair}%, 
                #dc3545 ${metrics.qualityDistribution.excellent + metrics.qualityDistribution.good + metrics.qualityDistribution.fair}% 100%
              )`
            }}>
              <span>{metrics.averageScore.toFixed(1)}</span>
            </div>
            <div className="score-legend">
              <div><span className="legend-color excellent"></span> Excellent: {metrics.qualityDistribution.excellent.toFixed(1)}%</div>
              <div><span className="legend-color good"></span> Good: {metrics.qualityDistribution.good.toFixed(1)}%</div>
              <div><span className="legend-color fair"></span> Fair: {metrics.qualityDistribution.fair.toFixed(1)}%</div>
              <div><span className="legend-color poor"></span> Poor: {metrics.qualityDistribution.poor.toFixed(1)}%</div>
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <h4>Description Length</h4>
          <div className="length-bars">
            <div className="length-bar">
              <div className="length-label">Detailed</div>
              <div className="length-track">
                <div className="length-fill" style={{ width: `${metrics.lengthDistribution.detailed}%` }}></div>
              </div>
              <div className="length-value">{metrics.lengthDistribution.detailed.toFixed(1)}%</div>
            </div>
            <div className="length-bar">
              <div className="length-label">Adequate</div>
              <div className="length-track">
                <div className="length-fill" style={{ width: `${metrics.lengthDistribution.adequate}%` }}></div>
              </div>
              <div className="length-value">{metrics.lengthDistribution.adequate.toFixed(1)}%</div>
            </div>
            <div className="length-bar">
              <div className="length-label">Brief</div>
              <div className="length-track">
                <div className="length-fill" style={{ width: `${metrics.lengthDistribution.brief}%` }}></div>
              </div>
              <div className="length-value">{metrics.lengthDistribution.brief.toFixed(1)}%</div>
            </div>
            <div className="length-bar">
              <div className="length-label">Minimal</div>
              <div className="length-track">
                <div className="length-fill" style={{ width: `${metrics.lengthDistribution.minimal}%` }}></div>
              </div>
              <div className="length-value">{metrics.lengthDistribution.minimal.toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="insights-grid">
        <div className="insight-card">
          <h4>Common Issues</h4>
          {commonIssues.length > 0 ? (
            <ul className="issues-list">
              {commonIssues.map((issue, index) => (
                <li key={index}>
                  <div className="issue-name">{getIssueLabel(issue.type)}</div>
                  <div className="issue-bar">
                    <div 
                      className="issue-fill" 
                      style={{ width: `${(issue.count / data.topIssues.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="issue-count">{issue.count}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-issues">No significant issues detected!</p>
          )}
        </div>
        
        <div className="insight-card">
          <h4>Improvement Tips</h4>
          <ul className="tips-list">
            {improvementTips.map((tip, index) => (
              <li key={index}>
                <strong>{tip.title}:</strong> {tip.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QualityInsights;