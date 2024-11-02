const makeConnection = require("../utils/connectToDB");

async function UpdateProfile(data) {
  try {
    const db = makeConnection();
    const [results] = await db.query(
      `UPDATE users SET CONTACT_NUMBER = ?, password = ? WHERE email = ?`,
      data
    );

    if (results.affectedRows === 1) {
      // One row was updated, indicating success
      return results;
    }

    throw new Error("Invalid email or password");
  } catch (error) {
    console.error("Error during login validation: ", error);
    throw error;
  }
}

module.exports = UpdateProfile;
