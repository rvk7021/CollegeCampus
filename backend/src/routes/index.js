const express = require("express");
const app = express();
const router = express.Router();
const loginContoller = require("../controllers/login-contoller");
const updateController = require("../controllers/updateDetail-controller");
const performancController = require("../controllers/performance-controller");
const TeacherCourseContoller = require("../controllers/TeacherCourse-controller");
const updateStudentCourse_controller = require("../controllers/updateStudentCourse_controller");
const update_Marks = require("../controllers/upadateMarks-controller");
const AdminAddUser = require("../controllers/adminOperation-controller");
const getNews = require("../repository/getnews");

router.post("/login", loginContoller.isValid);
router.patch("/updateDetails", updateController.UpdateDetails);
router.patch("/updateMarks", update_Marks.UpdateMark);
router.post("/performance", performancController.performanceDetails);
router.post("/course", TeacherCourseContoller.getCouses);
router.patch("/course", updateStudentCourse_controller.UpdateDetails);
router.post("/adminAddUser", AdminAddUser.addUser);
router.post("/adminAddCourse", AdminAddUser.addCourse);
router.get("/adminViewUser/:id", AdminAddUser.getUser);
router.patch("/adminUpdateUser/:id", AdminAddUser.updateUser);
router.delete("/adminDeleteUser/:id", AdminAddUser.deleteUser);
router.delete("/adminDeleteCourse/:id", AdminAddUser.deleteCourse);
router.get("/adminFeesStatus", AdminAddUser.feesStatus);
router.get("/studentFeesList", AdminAddUser.getfeesStatus);
router.get("/news",getNews);
router.put("/updateStudentFeeStatus/:id", AdminAddUser.setfeesStatus);


module.exports = router;
