const { AdminOpr_Serivce } = require("../services/index");

const adminOpr_Serivce = new AdminOpr_Serivce();

const addUser = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const response = await adminOpr_Serivce.addUser(data);
    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully add the user",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      data: {},
      success: false,
      message: error,
      error: error,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const data = req.params.id;
    console.log(data);
    const response = await adminOpr_Serivce.getUser(data);
    return res.status(200).json({
      data: response,
      success: true,
      message: "Successfully get the user",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      data: {},
      success: false,
      message: "Error while fetching the user details",
      error: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    console.log(data);
    const response = await adminOpr_Serivce.updateUser(id, data);
    return res.status(200).json({
      data: response,
      success: true,
      message: "Successfully update the user",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      data: {},
      success: false,
      message: "Error while updating the user details",
      error: error,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await adminOpr_Serivce.deleteUser(id);
    return res.status(200).json({
      data: response,
      success: true,
      message: "Successfully delete the user",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      data: {},
      success: false,
      message: "Error while deleting the user",
      error: error,
    });
  }
};

const addCourse = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const response = await adminOpr_Serivce.addCourse(data);
    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully add the course",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      data: {},
      success: false,
      message: error,
      error: error,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await adminOpr_Serivce.deleteCourse(id);
    return res.status(200).json({
      data: response,
      success: true,
      message: "Successfully delete the course",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      data: {},
      success: false,
      message: "Error while deleting the course",
      error: error,
    });
  }
};

const feesStatus = async (req, res) => {
  try {
    const response = await adminOpr_Serivce.feesStatus();
    return res.status(200).json({
      data: response,
      success: true,
      message: "Successfully fetch the data",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      data: {},
      success: false,
      message: "Error while fetching the data",
      error: error,
    });
  }
};

const getfeesStatus = async (req, res) => {
  try {
    const response = await adminOpr_Serivce.getfeesStatus();
    return res.status(200).json({
      data: response,
      success: true,
      message: "Successfully fetch the data",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Error while fetching the data",
      error: error,
    });
  }
};

const setfeesStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const feeStatus = req.body.Fees_Paid;

    const response = await adminOpr_Serivce.setfeesStatus(id, feeStatus);
    return res.status(200).json({
      data: response,
      success: true,
      message: "Successfully updating the fees data",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Error updating the fees data",
      error: error,
    });
  }
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  addCourse,
  deleteCourse,
  feesStatus,
  getfeesStatus,
  setfeesStatus,
};
