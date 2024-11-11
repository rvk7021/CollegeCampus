const makeConnection = require("../utils/connectToDB");

async function performanceRepository(data) {
  try {
    const db = makeConnection();
    console.log(data);
    const [results] = await db.query(
      `SELECT * FROM performance WHERE ID =?`,
      data
    );
    // console.log(results);

    if (results.length > 0) {
      return results;
    } else {
      throw "No performance records found for the given student ID";
    }
  } catch (error) {
    console.error("Error while fetching performance data: ", error);
    throw error;
  }
}

module.exports = performanceRepository;
