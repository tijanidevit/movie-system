const express = require("express");
const bodyParser = require("body-parser");
const { Administrator, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const salt = bcrypt.genSaltSync(10);

const { auth } = require("../middlewares/auth");
const { APP_URL } = require("../config/site");
router.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
router.use(bodyParser.json());

router.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (
    !username ||
    username == undefined ||
    username == "" ||
    username == null
  ) {
    res.status(200).json({
      success: false,
      message: "username is required and cannot be empty",
    });
  }
  try {
    let administrator = await Administrator.findOne({
      where: { username: username },
    });
    if (!administrator) {
      res.status(200).json({
        success: false,
        message: "This username address is not recognised",
      });
    } else {
      const verify_password = await bcrypt.compare(
        password,
        administrator.password
      );
      if (verify_password) {
        let token = jwt.sign(
          {
            username: administrator.username,
            id: administrator.id,
          },
          "secret",
          { expiresIn: "120 Days" }
        );

        res.status(200).json({
          success: true,
          message: "Authentication successful!",
          token: token,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Invalid Password",
        });
      }
    }
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Administrator Not Fetched" + err,
      error: err,
    });
  }
});

async function _check_Administrator_username(username) {
  return await Administrator.count({
    where: { username: username },
  });
}

module.exports = router;
