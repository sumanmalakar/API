const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'your_host',
  user: 'your_user',
  password: 'your_password',
  database: 'your_database',
});

// Function to retrieve users by companyId
function getUsersByCompanyId(companyId, callback) {
  // SQL query to fetch users by companyId
  const query = `
    SELECT * FROM user
    WHERE companyId = ?
  `;

  // Acquire a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      // Handle connection error
      callback(err, null);
      return;
    }

    // Execute the query with the provided companyId parameter
    connection.query(query, [companyId], (err, results) => {
      // Release the connection back to the pool
      connection.release();

      if (err) {
        // Handle query execution error
        callback(err, null);
        return;
      }

      // Return the results (list of users) to the callback function
      callback(null, results);
    });
  });
}

// Example usage
getUsersByCompanyId(1, (err, users) => {
  if (err) {
    console.error('Error fetching users:', err);
    return;
  }

  console.log('Users belonging to companyId 1:', users);
});
