const makeConnection = require("../utils/connectToDB");

async function getUser(data) {
  try {
    const db = makeConnection();
    console.log(data);
    if (data.length == 2) {
      const [results] = await db.query(
        `SELECT * FROM USERS WHERE email =? AND password =? `,
        data
      );
      console.log(results);
      if (results.length == 1) return results;
      else throw "Invalid email or password";
    } else if (data.length == 1) {
      const [results] = await db.query(`SELECT * FROM USERS WHERE id =?`, data);
      console.log(results);
      if (results.length == 1) return results;
      else throw "Invalid User ID";
    }
  } catch (error) {
    console.error("Error while login: ", error);
    throw error;
  }
}

module.exports = getUser;
