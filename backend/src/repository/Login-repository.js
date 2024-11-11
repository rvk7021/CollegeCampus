const makeConnection = require("../utils/connectToDB");

async function validateLogin(data) {
  try {
    console.log(data);
    const db = makeConnection();
    const [results] = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ? AND ROLE = ?",
      data
    );
    // console.log(results);
    if (results.length == 1) return results;
    throw "Invalid email or password";
  } catch (error) {
    console.error("Error while login: ", error);
    throw error;
  }
}

module.exports = validateLogin;
