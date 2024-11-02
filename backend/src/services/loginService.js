const { validateLogin } = require("../repository/index");

class LoginService {
  async loginValidaiton(data) {
    try {
      const response = await validateLogin([
        data.email,
        data.password,
        data.role,
      ]);
      return response;
    } catch (error) {
      console.log("error in service layer: " + error);
      throw error;
    }
  }
}

module.exports = LoginService;
