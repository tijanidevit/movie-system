const express = require("express");
const bodyParser = require("body-parser");
const {
  User,
  State,
  Gender,
  Landmark,
  LandmarkVisit,
  sequelize,
} = require("../models");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const salt = bcrypt.genSaltSync(10);

const { auth } = require("../middlewares/auth");
const multer = require("multer");
const { APP_URL } = require("../config/site");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/users");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
router.use(bodyParser.json());

router.post("/register", upload.single("profileImage"), async (req, res) => {
  // var APP_URL = req.protocol + "://" + req.get("host") + "/";

  let data = {
    fullname: req.body.fullname,
    password: req.body.password,
    profileImage: req.file.path,
    email: req.body.email,
  };

  if (
    !data.email ||
    data.email == undefined ||
    data.email == "" ||
    data.email == null
  ) {
    res.status(400).json({
      success: false,
      message: "Email Address is required and cannot be empty",
    });
  }
  const check_user_email = await _check_user_email(data.email);

  if (check_user_email) {
    res.status(400).json({
      success: false,
      message: data.email + " Already Exist",
    });
  } else {
    try {
      data.password = bcrypt.hashSync(data.password, salt);
      data.profileImage = APP_URL.concat(data.profileImage);
      const user = await User.create(data);
      let token = jwt.sign(
        {
          email: user.email,
          id: user.id,
        },
        "secret",
        { expiresIn: "120 Days" }
      );

      return res.status(201).json({
        success: true,
        message: "User Account Creation Successful",
        data: user,
        token: token,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "User Account Creation Failed" + err,
        error: err,
      });
    }
  }
});

router.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || email == undefined || email == "" || email == null) {
    res.status(400).json({
      success: false,
      message: "Email Address is required and cannot be empty",
    });
  }
  try {
    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(200).json({
        success: false,
        message: "This email address is not recognised",
      });
    } else {
      const verify_password = await bcrypt.compare(password, user.password);
      if (verify_password) {
        let token = jwt.sign(
          {
            email: user.email,
            id: user.id,
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
        res.status(400).json({
          success: false,
          message: "Invalid Password",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "User Not Fetched" + err,
      error: err,
    });
  }
});

async function _check_user_email(email) {
  aaa = await User.count({ where: { email: email } });
  return aaa;
}

module.exports = router;
