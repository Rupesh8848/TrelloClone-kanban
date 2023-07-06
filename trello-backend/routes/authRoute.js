const express = require("express");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const { postRegister, postLogin } = require("../controllers/authControllers");

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const authRoute = express.Router();

authRoute.post("/register", validator.body(registerSchema), postRegister);
authRoute.post("/login", validator.body(loginSchema), postLogin);

module.exports = authRoute;
