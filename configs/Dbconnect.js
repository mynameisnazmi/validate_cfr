const Connection = require('tedious').Connection;

const config = require('./config.json')
const connection = new Connection(config) 

// Handle connection events
connection.on('connect', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database.');
    // Call your CRUD operations here
  }
});

connection.on('error', (err) => {
  console.error('Database error:', err.message);
});

// Connect to the database
connection.connect();

module.exports = connection;
