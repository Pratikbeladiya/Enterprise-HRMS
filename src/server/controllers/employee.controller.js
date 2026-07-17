const Employee= require("../model/employee.model");

 const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("department")
      .populate("manager");

    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports={
    getAllEmployees
};