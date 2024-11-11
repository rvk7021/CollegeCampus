const { getCourse } = require("../repository/index");
class TeacherCourseService {
  async GetCourse(data) {
    try {
      const course = await getCourse({ ID: data.ID, type: data.ROLE });
      const response = course;
      return response;
    } catch (error) {
      console.log("Error in the service layer");
      throw error;
    }
  }
}

module.exports = TeacherCourseService;
