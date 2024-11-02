const makeConnection = require("../utils/connectToDB");

async function getCourse(data) {
  try {
    const db = makeConnection();
    console.log("backend");
    console.log(data);
    let query;
    switch (data.type) {
      case "teacher":
        query = `SELECT * FROM course WHERE InstructorId= ?`;
        break;

      case "courseid":
        query = `SELECT * FROM course WHERE ID= ?`;
        break;

      default:
        query = `SELECT * FROM course  `;
    }
    // case "courseid":
    // `SELECT * FROM course WHERE ID= ?`;

    const results = await db.query(query, [data.ID]);

    console.log(results[0]);
    if (results.length > 0) return results[0];
    throw "Invalid course id";
  } catch (error) {
    console.error("Error while finding course: ", error);
    throw error;
  }
}

module.exports = getCourse;
