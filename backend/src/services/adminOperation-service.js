const { AdminOpr_Repository } = require("../repository/index");

class AdminOpr_Serivce {
  constructor() {
    this.adminOpr_Repository = new AdminOpr_Repository();
  }
  async addUser(data) {
    try {
      if (
        !data.userName ||
        !data.role ||
        !data.contact_Number ||
        !data.email ||
        !data.password
      ) {
        throw "Some data fields are missing please check properly";
      }
      if (
        data.ROLE == "student" &&
        (!data.Course1ID ||
          !data.fees ||
          !data.Course2ID ||
          !data.Course3ID ||
          !data.Course4ID ||
          !data.Course5ID)
      ) {
        throw "Some data fields are missing please check properly";
      }

      const result = this.adminOpr_Repository.addUser(data);
      return result;
    } catch (error) {
      console.error("Error in service layer: ", error);
      throw error;
    }
  }
  async getUser(data) {
    try {
      if (!data) {
        throw "User ID missing please fill it properly";
      }
      const result = this.adminOpr_Repository.getUser(data);
      return result;
    } catch (error) {
      console.error("Error in service layer: ", error);
      throw error;
    }
  }
  async updateUser(id, data) {
    try {
      id = parseInt(id, 10);
      if (
        !id ||
        !data.NAME ||
        !data.ROLE ||
        !data.CONTACT_NUMBER ||
        !data.email ||
        !data.password
      ) {
        throw "Some data fields are missing please check properly";
      }
      const result = this.adminOpr_Repository.updateUser(id, data);
      return result;
    } catch (error) {
      console.error("Error in service layer: ", error);
      throw error;
    }
  }
  async deleteUser(id) {
    try {
      id = parseInt(id, 10);
      if (!id) {
        throw "ID fields is missing please fill properly";
      }
      const result = this.adminOpr_Repository.deleteUser(id);
      return result;
    } catch (error) {
      console.error("Error in service layer: ", error);
      throw error;
    }
  }
  async addCourse(data) {
    try {
      if (
        !data.CourseID ||
        !data.CourseName ||
        !data.departmentId ||
        !data.InstructorId
      ) {
        throw "Some data fields are missing please check properly";
      }
      Object.keys(data).forEach((dataKey) => {
        if (dataKey != "CourseName") data[dataKey] = parseInt(data[dataKey]);
      });
      const result = this.adminOpr_Repository.addCourse(data);
      return result;
    } catch (error) {
      console.error("Error in service layer: ", error);
      throw error;
    }
  }
  async deleteCourse(id) {
    try {
      id = parseInt(id, 10);
      if (!id) {
        throw "ID fields is missing please fill properly";
      }
      const result = this.adminOpr_Repository.deleteCourse(id);
      return result;
    } catch (error) {
      console.error("Error in service layer: ", error);
      throw error;
    }
  }
  async feesStatus() {
    try {
      const result = this.adminOpr_Repository.feesStatus();
      return result;
    } catch (error) {
      console.error("Error in service layer: ", error);
      throw error;
    }
  }
  async getfeesStatus() {
    try {
      const result = this.adminOpr_Repository.getfeesStatus();
      return result;
    } catch (error) {
      console.error("Error in service layer: ", error);
      throw error;
    }
  }

  async setfeesStatus(id, feesStatus) {
    try {
      const result = this.adminOpr_Repository.setfeesStatus(id, feesStatus);
      return result;
    } catch (error) {
      console.error("Error in service layer: ", error);
      throw error;
    }
  }
}

module.exports = AdminOpr_Serivce;
