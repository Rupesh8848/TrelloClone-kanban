const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const authRoute = require("./routes/authRoute");

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoute);

module.exports = app;
