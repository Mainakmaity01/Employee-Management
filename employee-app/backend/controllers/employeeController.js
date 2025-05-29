const Employee = require('../models/Employee');

function generateEmpId(index) {
  return 'EMP' + (10000 + index + 1);
}

function generateLoginId(first, last, existingIds) {
  let base = first[0].toLowerCase() + last.toLowerCase();
  let finalId = base;
  let suffix = 0;
  while (existingIds.includes(finalId)) {
    suffix = Math.floor(100 + Math.random() * 900);
    finalId = base + suffix;
  }
  return finalId;
}

exports.addEmployee = async (req, res) => {
  try {
    const { firstName, lastName, middleName, dob, department, salary, permanentAddress, currentAddress } = req.body;
    const dobDate = new Date(dob);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    if (age < 18) return res.status(400).json({ success: false, error: 'Age must be at least 18' });

    const count = await Employee.countDocuments();
    const empId = generateEmpId(count);
    const existingLoginIds = (await Employee.find({}, 'loginId')).map(e => e.loginId);
    const loginId = generateLoginId(firstName, lastName, existingLoginIds);

    const employee = new Employee({
      empId,
      firstName,
      lastName,
      middleName,
      loginId,
      dob,
      department,
      salary,
      permanentAddress,
      currentAddress,
      idProofPath: req.file.path
    });

    await employee.save();
    res.json({ success: true, empId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const { empId, firstName, lastName, loginId, dobFrom, dobTo, department } = req.query;
    const filter = {};
    if (empId) filter.empId = empId;
    if (firstName) filter.firstName = new RegExp(firstName, 'i');
    if (lastName) filter.lastName = new RegExp(lastName, 'i');
    if (loginId) filter.loginId = new RegExp(loginId, 'i');
    if (department) filter.department = department;
    if (dobFrom || dobTo) {
      filter.dob = {};
      if (dobFrom) filter.dob.$gte = new Date(dobFrom);
      if (dobTo) filter.dob.$lte = new Date(dobTo);
    }
    const employees = await Employee.find(filter);
    res.json({ success: true, employees });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

