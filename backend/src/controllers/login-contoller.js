const { LoginService } = require("../services/index");

const loginService = new LoginService();

const isValid = async (req, res) => {
  try {
    const data = req.body;
    const response = await loginService.loginValidaiton(data);
    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully  login in the account",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Error while login in the account",
      error: error,
    });
  }
};

module.exports = {
  isValid,
};
