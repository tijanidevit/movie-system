const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function register(req, res) {
  const user = {
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    profileImage: req.body.profileImage,
  };

  User.create(user)
    .then((result) =>
      res.status(201).json({
        success: true,
        message: "Registration Successful",
        data: result,
      })
    )
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "Registration Failed",
        error: err,
      });
    });
}

module.exports = {
  register: register,
};
