const { performanceService } = require("../services/index");

const PerformanceService = new performanceService();

const performanceDetails = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const response = await PerformanceService.performance(data);
    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully  fetched the details",
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Error while fetching the details",
      error: error,
    });
  }
};

module.exports = {
  performanceDetails,
};
