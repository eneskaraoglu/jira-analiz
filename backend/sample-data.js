/**
 * This file provides sample data for testing the application
 * when no Jira CSV is available or for development purposes.
 */

const sampleJiraData = [
  {
    Key: "PROJ-123",
    Summary: "Implement user authentication",
    Description: "We need to add a user authentication system with login, logout, and password reset functionality. The system should use JWT tokens and secure password hashing.\n\nRequirements:\n- Login form with validation\n- Password reset via email\n- Remember me functionality\n- Account lockout after failed attempts",
    Creator: "John Doe",
    Created: "2023-01-15T09:30:00.000Z"
  },
  {
    Key: "PROJ-124",
    Summary: "Fix navbar responsiveness",
    Description: "The navigation bar doesn't work correctly on mobile devices.",
    Creator: "Jane Smith",
    Created: "2023-01-16T10:15:00.000Z"
  },
  {
    Key: "PROJ-125",
    Summary: "Database optimization",
    Description: "The database queries are running slow, especially on the user dashboard. We need to optimize the following queries:\n\n1. User activity history\n2. Dashboard statistics\n3. Report generation\n\nConsider adding indexes for frequently accessed columns and reviewing the join operations in complex queries.",
    Creator: "John Doe",
    Created: "2023-01-18T14:22:00.000Z"
  },
  {
    Key: "PROJ-126",
    Summary: "Update documentation",
    Description: "Update API documentation with new endpoints",
    Creator: "Alex Johnson",
    Created: "2023-01-20T11:05:00.000Z"
  },
  {
    Key: "PROJ-127",
    Summary: "Implement dark mode",
    Description: "Add dark mode support to the application UI. This should include:\n\n- A toggle switch in the user settings\n- Persistent preference saving\n- Appropriate color scheme that meets accessibility standards\n- Automatic switching based on system preferences\n\nThe implementation should use CSS variables for easy theming.",
    Creator: "Jane Smith",
    Created: "2023-01-22T09:10:00.000Z"
  },
  {
    Key: "PROJ-128",
    Summary: "Fix login bug",
    Description: "Users report sometimes getting stuck on the login page after entering correct credentials.",
    Creator: "Alex Johnson",
    Created: "2023-01-25T16:30:00.000Z"
  },
  {
    Key: "PROJ-129",
    Summary: "Add export to CSV feature",
    Description: "Users need to be able to export their data to CSV format. This should be available on the reports page and should include options for selecting date ranges and data categories.\n\nTechnical details:\n- Use a streaming approach for large datasets\n- Include proper header formatting\n- Handle special characters and escaping\n- Add progress indicator for large exports",
    Creator: "John Doe",
    Created: "2023-01-28T13:45:00.000Z"
  },
  {
    Key: "PROJ-130",
    Summary: "Improve error handling",
    Description: "Improve error handling throughout the application",
    Creator: "Alex Johnson",
    Created: "2023-02-01T10:20:00.000Z"
  },
  {
    Key: "PROJ-131",
    Summary: "Performance optimization for image gallery",
    Description: "The image gallery is loading slowly for users with many images. Implement the following optimizations:\n\n1. Lazy loading for images not in the viewport\n2. Image compression and responsive sizes\n3. Pagination or infinite scrolling instead of loading all at once\n4. Preloading of adjacent images\n\nAlso consider using a CDN for faster image delivery and caching.",
    Creator: "Jane Smith",
    Created: "2023-02-05T09:30:00.000Z"
  },
  {
    Key: "PROJ-132",
    Summary: "Update dependencies",
    Description: "Update all npm packages to their latest versions",
    Creator: "John Doe",
    Created: "2023-02-10T14:15:00.000Z"
  }
];

module.exports = {
  sampleJiraData
};