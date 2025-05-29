const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  empId: { type: String, unique: true },
  firstName: String,
  lastName: String,
  middleName: String,
  loginId: { type: String, unique: true },
  dob: Date,
  department: String,
  salary: Number,
  permanentAddress: String,
  currentAddress: String,
  idProofPath: String,
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
