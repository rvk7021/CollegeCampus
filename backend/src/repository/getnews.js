const makeConnection = require("../utils/connectToDB");

async function getNews(category) {
  try {
    const db = makeConnection();
    console.log("Fetching news for category:", category);

    let query;
    let queryParams = [];
    
    // Determine the query based on the category type
    switch (category) {
      case "students":
        query = `SELECT * FROM studentnews ORDER BY date DESC LIMIT 4`;
        break;

      case "teachers":
        query = `SELECT * FROM teachernews ORDER BY date DESC LIMIT 4`;
        break;

      case "important":
        query = `SELECT * FROM latestnews WHERE category = 'Important' ORDER BY date DESC LIMIT 4`;
        break;

      default:
        throw new Error("Invalid category type provided");
    }

    const [results] = await db.query(query, queryParams);

    console.log(results);
    if (results && results.length > 0) return results;
    throw new Error("No news found for the specified category");

  } catch (error) {
    console.error("Error while fetching news:", error);
    throw error;
  }
}

module.exports = getNews;
