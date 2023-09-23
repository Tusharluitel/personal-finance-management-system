const User = require("../models/userModels");

// login user
const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(name, email, phoneNumber, password);
    res.status(200).json({ name, email, phoneNumber, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
