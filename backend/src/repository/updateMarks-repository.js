const makeConnection = require("../utils/connectToDB");

async function UpdateStudentMarks(data) {
  try {
    console.log(data);
    const db = makeConnection();
    const marks = data.result;
    if (
      marks[0] > 100 ||
      marks[1] > 100 ||
      marks[2] > 100 ||
      marks[3] > 100 ||
      marks[4] > 100
    ) {
      throw "Enter proper Marks";
    }
    const [results] = await db.query(
      `UPDATE  performance
        SET 
            Course1_Marks = ?,
            Course2_Marks = ?,
            Course3_Marks = ?,
            Course4_Marks = ?,
            Course5_Marks = ?
        WHERE 
            ID = ?`,
      [marks[0], marks[1], marks[2], marks[3], marks[4], data.ID]
    );

    if (results.affectedRows >= 1) {
      return results;
    }

    throw new Error("Invalid student ID or selected course");
  } catch (error) {
    console.error("Error during changing the course: ", error);
    throw error;
  } finally {
    // Ensure the connection is closed after the query
  }
}

module.exports = UpdateStudentMarks;
