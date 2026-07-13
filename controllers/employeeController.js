const getAllEmployees = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      employees: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Employee fetched successfully",
      employeeId: req.params.id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
};
