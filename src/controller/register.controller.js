const Registration = require('../models/Registration');

exports.getAllRegistrations = async (req, res) => {
  try {
    const all = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRegistration = async (req, res) => {
  const { childName, age, parentName, phone, email, course } = req.body;

  if (!childName || !age || !parentName || !phone || !email || !course) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newRegistration = new Registration({
      childName,
      age,
      parentName,
      phone,
      email,
      course,
    });

    await newRegistration.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};