const express = require('express');
const router = express.Router();
const multer = require('multer');
const employeeController = require('../controllers/employeeController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'backend/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    file.mimetype === 'application/pdf' ? cb(null, true) : cb(new Error('Only PDF allowed!'));
  },
});

router.post('/add', upload.single('idProof'), employeeController.addEmployee);
router.get('/filter', employeeController.getEmployees);

module.exports = router;
