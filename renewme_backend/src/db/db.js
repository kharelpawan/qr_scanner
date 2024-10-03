// // db.js
// import mysql from 'mysql2';
// import dotenv from 'dotenv';

// // Load environment variables from a .env file into process.env
// dotenv.config();

// // Create a connection pool
// const db = mysql.createConnection({
//   host: process.env.MYSQL_HOST,     // MySQL host
//   user: process.env.MYSQL_USER,     // MySQL user
//   password: process.env.MYSQL_PASSWORD, // MySQL password
//   database: process.env.MYSQL_DB    // Database name
// }).promise(); // Convert to a promise-based API

// // Export the pool for use in other parts of your application
// export default db;

import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Log environment variables to ensure they are loaded correctly
console.log('MySQL Host:', process.env.MYSQL_HOST);
console.log('MySQL User:', process.env.MYSQL_USER);

// Create the MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,     // MySQL host
  user: process.env.MYSQL_USER,     // MySQL user
  password: process.env.MYSQL_PASSWORD, // MySQL password
  database: process.env.MYSQL_DB    // Database name
}).promise(); // Convert to a promise-based API

// Handle errors when establishing the connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL database.');
  }
});

export default db;
