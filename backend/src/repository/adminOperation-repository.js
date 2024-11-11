const makeConnection = require("../utils/connectToDB");
const getCourse = require("./getCourse");
const getUser = require("./getUser");

class AdminOpr_Repository {
  async addUser(data) {
    try {
      console.log(data);
      const db = makeConnection();
      let flag = 0;
      try {
        const ifPresent = await getUser([data.email, data.password]);
      } catch (error) {
        flag = 1;
      }
      if (!flag) {
        throw "User with credential already exist please enter details properly";
      } else {
        const addUserQuery = `insert into users (NAME,ROLE,CONTACT_NUMBER,email,password) values (?,?,?,?,?)`;
        const [results] = await db.query(addUserQuery, [
          data.userName,
          data.role,
          data.contact_Number,
          data.email,
          data.password,
        ]);

        if (results.affectedRows <= 0) {
          throw "Error while creating the user";
        }

        if (data.role === "student") {
          const lastIDQuery = `select max(ID) as Lastid from users`;
          let [lastID] = await db.query(lastIDQuery);
          lastID = lastID[0].Lastid;
          const rollNo = "S00" + lastID;
          const addStudentQuery = `insert into student (ID,Roll_Number,DEPARTMENTID,Course1ID,Course2ID,Course3ID,Course4ID,Course5ID,Fees_Paid) values (?,?,?,?,?,?,?,?,?)`;
          const [addStudent] = await db.query(addStudentQuery, [
            lastID,
            rollNo,
            data.departmentId,
            data.courseIds[0],
            data.courseIds[1],
            data.courseIds[2],
            data.courseIds[3],
            data.courseIds[4],
            data.fees,
          ]);

          const addPerformanceQuery =
            "insert into performance (ID,Course1ID,Course2ID,Course3ID,Course4ID,Course5ID) values (?,?,?,?,?,?)";
          const [addPerformance] = await db.query(addPerformanceQuery, [
            lastID,
            data.courseIds[0],
            data.courseIds[1],
            data.courseIds[2],
            data.courseIds[3],
            data.courseIds[4],
          ]);
          if (
            addPerformance.affectedRows >= 1 &&
            addStudent.affectedRows >= 1
          ) {
            return 1;
          }
        } else if (data.role === "teacher") {
          const lastIDQuery = `select max(ID) as Lastid from users`;
          let [lastID] = await db.query(lastIDQuery);
          lastID = lastID[0].Lastid;
          const rollNo = "TOO" + lastID;
          const addTeacherQuery = `insert into instructor (ID,RollNo) values (?,?)`;
          const [addTeacher] = await db.query(addTeacherQuery, [
            lastID,
            rollNo,
          ]);

          if (addTeacher.affectedRows >= 1) {
            return 1;
          }
        } else {
          return 1;
        }
      }
    } catch (error) {
      console.error("Error in repository layer: ", error);
      throw error;
    }
  }
  async getUser(data) {
    try {
      console.log(data);
      const UserData = await getUser([data]);
      return UserData[0];
    } catch (error) {
      console.error("Error in repository layer: ", error);
      throw " No user with given ID exist, please enter proper ID";
    }
  }
  async updateUser(id, data) {
    try {
      console.log(data);
      const db = makeConnection();
      const UpdateUserQuery =
        "update users set NAME= ?,ROLE= ?,CONTACT_NUMBER= ?,email= ?,password= ? where ID = ? ";

      const UpdateUser = await db.query(UpdateUserQuery, [
        data.NAME,
        data.ROLE,
        data.CONTACT_NUMBER,
        data.email,
        data.password,
        id,
      ]);
      return "Done";
    } catch (error) {
      console.error("Error in repository layer: ", error);
      throw error;
    }
  }
  async deleteUser(id) {
    try {
      const db = makeConnection();
      const DeleteUserQuery = "delete from users where id = ? ";
      const [DeleteUser] = await db.query(DeleteUserQuery, [id]);
      if (DeleteUser.affectedRows == 1) return "Done";
      else if (DeleteUser.affectedRows == 0)
        throw "No such user with this ID exists";
      else throw "Error while deleting the user";
    } catch (error) {
      console.error("Error in repository layer: ", error);
      throw error;
    }
  }

  async addCourse(data) {
    try {
      console.log(data);
      const db = makeConnection();
      let flag = 0;
      try {
        const ifPresent = await getCourse({
          type: "courseid",
          ID: data.CourseID,
        });
      } catch (error) {
        flag = 1;
      }
      if (flag) {
        throw "Course with this id already exist please enter details properly";
      } else {
        const addCourseQuery = `insert into course (ID,CourseName,DepartmentID,InstructorId) values (?,?,?,?)`;
        const [results] = await db.query(addCourseQuery, [
          data.CourseID,
          data.CourseName,
          data.departmentId,
          data.InstructorId,
        ]);

        if (results.affectedRows <= 0) {
          throw "Error while creating the course fill details propely once again";
        }

        if (results.affectedRows >= 1) {
          return "Created";
        }
      }
    } catch (error) {
      console.error("Error in repository layer: ", error);
      throw error;
    }
  }
  async deleteCourse(id) {
    try {
      const db = makeConnection();
      const DeleteCourseQuery = "delete from course where id = ? ";
      const [DeleteCourse] = await db.query(DeleteCourseQuery, [id]);
      if (DeleteCourse.affectedRows == 1) return "Done";
      else if (DeleteCourse.affectedRows == 0)
        throw "No such Course with this ID exists";
      else throw "Error while deleting the Course";
    } catch (error) {
      console.error("Error in repository layer: ", error);
      throw error;
    }
  }
  async feesStatus() {
    try {
      const db = makeConnection();
      let feesStatus_Query =
        "select count(id) from student where Fees_Paid='YES' ";
      let [result] = await db.query(feesStatus_Query);

      const counter = "count(id)";

      const paidCount = result[0][counter];

      feesStatus_Query = "select count(id) from student where Fees_Paid='NO' ";
      [result] = await db.query(feesStatus_Query);

      const notPaidCount = result[0][counter];

      console.log(paidCount);
      console.log(notPaidCount);
      if (paidCount != undefined && notPaidCount != undefined) {
        const response = [paidCount, notPaidCount];
        return response;
      } else {
        throw "Error retrieving count of students who paid fees.";
      }
    } catch (error) {
      console.error("Error in repository layer: ", error);
      throw error;
    }
  }
  async getfeesStatus() {
    try {
      const db = makeConnection();
      let getfeesStatus_Query = "select  id , Fees_Paid from student";
      let [result] = await db.query(getfeesStatus_Query);

      console.log(result);

      return result;
    } catch (error) {
      console.error("Error in repository layer: ", error);
      throw error;
    }
  }
  async setfeesStatus(id, feeStatus) {
    try {
      id = parseInt(id);
      const db = makeConnection();

      console.log(id, feeStatus);
      let getfeesStatus_Query = "update student set Fees_Paid = ? where id = ?";
      let [result] = await db.query(getfeesStatus_Query,[feeStatus,id]);

      console.log(result);

      if (result.affectedRows == 1)       return result;
      else if (DeleteCourse.affectedRows == 0)
        throw "No student with this ID exists";
      else throw "Error while updating the Fees";

    } catch (error) {
      console.error("Error in repository layer: ", error);
      throw error;
    }
  }
}

module.exports = AdminOpr_Repository;
