const { TeacherCourseService } = require("../services/index");

const teacherCourseService = new TeacherCourseService();

const getCouses = async (req, res) => {
  try {
    const data = req.body;
    console.log("data");
    console.log(data);
    const response = await teacherCourseService.GetCourse(data);
    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully  fetched the courses",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Error while fetching the courses",
      error: error,
    });
  }
};

module.exports = {
  getCouses,
};
