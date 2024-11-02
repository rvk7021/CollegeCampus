const { UpdateStudentMarks } = require("../repository/index");

class UpdateMarks_Service {
  async update_Marks(data) {
    try {
      console.log(data);
      const response = await UpdateStudentMarks(data);
      return response;
    } catch (error) {
      console.log("error in service layer: " + error);
      throw error;
    }
  }
}

module.exports = UpdateMarks_Service;
