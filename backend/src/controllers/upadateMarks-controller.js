const { UpdateMarks_Service } = require("../services/index");

const UpdateMark_Serivce = new UpdateMarks_Service();

const UpdateMark = async (req, res) => {
  try {
    const data = req.body;
    const response = await UpdateMark_Serivce.update_Marks(data);
    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully  update the marks",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Error while updating the marks",
      error: error,
    });
  }
};

module.exports = {
  UpdateMark,
};
