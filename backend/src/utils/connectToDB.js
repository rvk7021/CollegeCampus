const mysql = require("mysql2");
const { DB_PASS } = require("../config/serverConfig");

const makeConnection = () => {
  try {
    const connection = mysql.createPool({
      host: "localhost",
      user: "root",
      password: DB_PASS,
      database: "school_management_db",
      waitForConnections: true,
    });
    console.log("connected");
    return connection.promise(); // Convert the pool to promise-based
  } catch (error) {
    console.log("Error while connecting to DB");
    throw error;
  }
};

module.exports = makeConnection;
