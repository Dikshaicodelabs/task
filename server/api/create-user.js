const User = require('../models/user');

const createUser = async (req, res) => {
  const { name, email, token } = req.body;

  try {
    // Check if all required fields are provided
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create the new user
    const newUser = new User({ name, email, token });

    await newUser.save();

    res.status(201).send({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = createUser;
