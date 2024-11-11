const { performanceRepository } = require("../repository/index");
const { getCourse } = require("../repository/index");
class performanceService {
  async performance(data) {
    try {
      const performance = await performanceRepository([data.ID]);
      const cid1 = performance[0].Course1ID;
      const cid2 = performance[0].Course2ID;
      const cid3 = performance[0].Course3ID;
      const cid4 = performance[0].Course4ID;
      const cid5 = performance[0].Course5ID;

      const c1 = await getCourse({ ID: cid1, type: "courseid" });
      const c2 = await getCourse({ ID: cid2, type: "courseid" });
      const c3 = await getCourse({ ID: cid3, type: "courseid" });
      const c4 = await getCourse({ ID: cid4, type: "courseid" });
      const c5 = await getCourse({ ID: cid5, type: "courseid" });

      var c1Name = c1[0].CourseName;
      var c2Name = c2[0].CourseName;
      let c3Name = c3[0].CourseName;
      let c4Name = c4[0].CourseName;
      let c5Name = c5[0].CourseName;

      const performanceData = [
        { [c1Name]: performance[0].Course1_Marks },
        { [c2Name]: performance[0].Course2_Marks },
        { [c3Name]: performance[0].Course3_Marks },
        { [c4Name]: performance[0].Course4_Marks },
        { [c5Name]: performance[0].Course5_Marks },
      ];

      return performanceData;
    } catch (error) {
      console.log("Error in the service layer");
      throw error;
    }
  }
}

module.exports = performanceService;
