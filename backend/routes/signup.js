const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // adjust path if needed

const router = express.Router();

router.post('/', async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
});

module.exports = router;
