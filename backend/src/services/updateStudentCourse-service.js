const { UpdateStdentCourse } = require("../repository/index");

class UpdateProfile_Service {
  async updateCourse(data) {
    try {
      // console.log("In service layer");
      console.log(data);
      //   const data1 = await getUser([data.email, data.password]);
      // console.log(data1);
      //   if (data.newPassword) {
      //     data1[0].password = data.newPassword;
      //   }
      //   if (data.CONTACT_NUMBER) {
      //     data1[0].CONTACT_NUMBER = data.CONTACT_NUMBER;
      //   }
      const response = await UpdateStdentCourse(data);
      return response;
    } catch (error) {
      console.log("error in service layer: " + error);
      throw error;
    }
  }
}

module.exports = UpdateProfile_Service;
