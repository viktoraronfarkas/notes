const mysql = require('mysql');
require('dotenv').config();

const config = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

config.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = {config};