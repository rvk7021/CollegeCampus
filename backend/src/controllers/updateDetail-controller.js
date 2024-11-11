const { UpdateProfile_Service } = require("../services/index");

const Update_Serivce = new UpdateProfile_Service();

const UpdateDetails = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const response = await Update_Serivce.updateProfile(data);
    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully  update the details",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Error while updating the details",
      error: error,
    });
  }
};

module.exports = {
  UpdateDetails,
};
