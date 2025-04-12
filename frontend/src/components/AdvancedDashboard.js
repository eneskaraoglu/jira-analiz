import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdvancedDashboard = ({ data }) => {
  const [viewMode, setViewMode] = useState('creators');
  
  // Early return if no data is provided
  if (!data || !data.creatorStats || !data.topIssues) {
    return <div>No data available for visualization.</div>;
  }
  
  // Prepare data for quality distribution chart
  const prepareQualityDistribution = () => {
    const qualityRanges = [
      { range: '0-2 (Poor)', count: 0 },
      { range: '3-5 (Fair)', count: 0 },
      { range: '6-8 (Good)', count: 0 },
      { range: '9-10 (Excellent)', count: 0 }
    ];
    
    data.topIssues.forEach(issue => {
      if (issue.score <= 2) qualityRanges[0].count++;
      else if (issue.score <= 5) qualityRanges[1].count++;
      else if (issue.score <= 8) qualityRanges[2].count++;
      else qualityRanges[3].count++;
    });
    
    return qualityRanges;
  };
  
  const qualityDistribution = prepareQualityDistribution();
  
  return (
    <div className="advanced-dashboard">
      <div className="dashboard-nav">
        <button 
          className={viewMode === 'creators' ? 'active' : ''} 
          onClick={() => setViewMode('creators')}
        >
          Creator Performance
        </button>
        <button 
          className={viewMode === 'quality' ? 'active' : ''} 
          onClick={() => setViewMode('quality')}
        >
          Quality Distribution
        </button>
        <button 
          className={viewMode === 'comparison' ? 'active' : ''} 
          onClick={() => setViewMode('comparison')}
        >
          Comparison View
        </button>
      </div>
      
      {viewMode === 'creators' && (
        <div className="creators-view">
          <h3>Creator Performance Overview</h3>
          <div className="chart-grid">
            <div className="chart-container">
              <h4>Average Description Score by Creator</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.creatorStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="creator" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip formatter={(value) => value.toFixed(1)} />
                  <Legend />
                  <Bar dataKey="averageScore" fill="#8884d8" name="Average Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="chart-container">
              <h4>Issue Count by Creator</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.creatorStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="creator" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="issueCount" fill="#82ca9d" name="Number of Issues" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="ranking-table">
            <h4>Creator Rankings</h4>
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Creator</th>
                  <th>Average Score</th>
                  <th>Issues Created</th>
                  <th>Performance Rating</th>
                </tr>
              </thead>
              <tbody>
                {data.creatorStats.map((creator, index) => (
                  <tr key={creator.creator}>
                    <td>{index + 1}</td>
                    <td>{creator.creator}</td>
                    <td>{creator.averageScore.toFixed(2)}</td>
                    <td>{creator.issueCount}</td>
                    <td>
                      <span className={
                        creator.averageScore >= 8 ? 'rating excellent' : 
                        creator.averageScore >= 6 ? 'rating good' : 
                        creator.averageScore >= 4 ? 'rating fair' : 'rating poor'
                      }>
                        {
                          creator.averageScore >= 8 ? 'Excellent' : 
                          creator.averageScore >= 6 ? 'Good' : 
                          creator.averageScore >= 4 ? 'Fair' : 'Poor'
                        }
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {viewMode === 'quality' && (
        <div className="quality-view">
          <h3>Description Quality Distribution</h3>
          <div className="chart-grid">
            <div className="chart-container">
              <h4>Quality Score Distribution</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={qualityDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="range"
                  >
                    {qualityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => value} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="chart-container">
              <h4>Top Issues by Quality</h4>
              <div className="issues-table">
                <table>
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Summary</th>
                      <th>Creator</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topIssues.slice(0, 5).map(issue => (
                      <tr key={issue.key}>
                        <td>{issue.key}</td>
                        <td className="summary-cell">
                          <div className="summary-tooltip">{issue.summary}</div>
                          {issue.summary.length > 30 ? 
                            `${issue.summary.substring(0, 30)}...` : 
                            issue.summary
                          }
                        </td>
                        <td>{issue.creator}</td>
                        <td>
                          <div className="score-bar">
                            <div 
                              className="score-fill" 
                              style={{ 
                                width: `${issue.score * 10}%`,
                                backgroundColor: 
                                  issue.score >= 8 ? '#28a745' : 
                                  issue.score >= 6 ? '#ffc107' : 
                                  issue.score >= 4 ? '#fd7e14' : '#dc3545'
                              }}
                            >
                              {issue.score.toFixed(1)}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {viewMode === 'comparison' && (
        <div className="comparison-view">
          <h3>Creator Performance Comparison</h3>
          <div className="chart-container full-width">
            <h4>Score vs. Issue Count</h4>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data.creatorStats}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="creator" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="averageScore" name="Avg. Score" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="issueCount" name="Issue Count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="recommendations">
            <h4>Recommendations for Improvement</h4>
            <ul>
              <li>
                <strong>Quality Guidelines:</strong> Establish clear description quality guidelines for all team members.
              </li>
              <li>
                <strong>Templates:</strong> Create description templates for common issue types.
              </li>
              <li>
                <strong>Training:</strong> Provide training sessions for team members with lower scores.
              </li>
              <li>
                <strong>Recognition:</strong> Recognize and reward team members with consistently high-quality descriptions.
              </li>
              <li>
                <strong>Regular Review:</strong> Schedule periodic reviews of description quality.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedDashboard;