const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");

const postRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await userModel.findOne({ email });

  console.log(userExists);

  if (userExists) {
    return res.status(400).json({
      exception: true,
      error: "User with given email already exists.",
    });
  }

  try {
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password,
    });

    const registeredUser = await newUser.save();

    const token = await jwt.sign(
      {
        id: registeredUser._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      exception: false,
      data: {
        token,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
      },
    });
  } catch (error) {
    return res.status(400).json({
      exception: true,
      error: "Some error occured at server. Please try again later",
    });
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await userModel.findOne({ email });

  if (!userExists) {
    return res
      .status(400)
      .json({ exception: true, error: "Please check your credentials" });
  }

  try {
    const isValidUser = await bcrypt.compare(password, userExists.password);
    if (!isValidUser) {
      return res
        .status(400)
        .json({ exception: true, error: "Please check your credentials" });
    }

    const token = await jwt.sign(
      {
        id: userExists._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      exception: false,
      data: {
        token,
        firstName: userExists.firstName,
        lastName: userExists.lastName,
      },
    });
  } catch (error) {
    return res.status(400).json({
      exception: true,
      error: "Some error occured at server. Please try again later",
    });
  }
};

module.exports = { postRegister, postLogin };
