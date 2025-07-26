const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  childName: String,
  age: Number,
  parentName: String,
  phone: String,
  email: String,
  course: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', registrationSchema);
