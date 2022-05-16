const express = require("express");
const bodyParser = require("body-parser");
const {
  Tourist,
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
  let dt = ({ fullname } = body);
  res.status(400).json({
    success: false,
    message: dt,
  });
  let data = {
    firstname: req.body.firstname,
    othernames: req.body.othernames,
    phone: req.body.phone,
    state_id: req.body.state_id,
    password: req.body.password,
    gender_id: req.body.gender_id,
    profileImage: req.file.path,
    email: req.body.email,
    email: req.body.email,
    date_of_birth: req.body.date_of_birth,
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
  const check_tourist_email = await _check_tourist_email(data.email);

  if (check_tourist_email) {
    res.status(400).json({
      success: false,
      message: data.email + " Already Exist",
    });
  } else {
    try {
      data.password = bcrypt.hashSync(data.password, salt);
      const tourist = await Tourist.create(data);
      let token = jwt.sign(
        {
          email: tourist.email,
          id: tourist.id,
        },
        "secret",
        { expiresIn: "120 Days" }
      );

      return res.status(201).json({
        success: true,
        message: "Tourist Creation Successful",
        data: tourist,
        token: token,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Tourist Creation Failed" + err,
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
    let tourist = await Tourist.findOne({ where: { email: email } });
    if (!tourist) {
      res.status(200).json({
        success: false,
        message: "This email address is not recognised",
      });
    } else {
      const verify_password = await bcrypt.compare(password, tourist.password);
      if (verify_password) {
        let token = jwt.sign(
          {
            email: tourist.email,
            id: tourist.id,
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
      message: "Tourist Not Fetched" + err,
      error: err,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const tourists = await Tourist.findAll();
    res.status(200).json({
      success: true,
      message: "Tourists Fetch Successful",
      data: tourists,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Tourists Not Fetched",
      error: err,
    });
  }
});

router.get("/profile", auth, async (req, res) => {
  const id = req.token_data.id;
  try {
    const tourist = await Tourist.findByPk(id, {
      include: [
        { model: State, as: "state" },
        { model: Gender, as: "gender" },
      ],
    });
    if (!tourist) {
      res.status(200).json({
        success: false,
        message: "Account Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Account Fetch Successful",
        data: tourist,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Account Not Fetched" + err,
      error: err,
    });
  }
});

router.delete("/delete", auth, async (req, res) => {
  const id = req.token_data.id;
  const tourist = await Tourist.findOne({ where: { id: id } });
  if (!tourist) {
    res.status(200).json({
      success: false,
      message: "Account Not Found",
    });
  } else {
    try {
      Tourist.destroy();
      return res.status(201).json({
        success: true,
        message: "Account Deleted Successful",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Account Deletion Failed" + err,
        error: err,
      });
    }
  }
});

router.patch("/update", auth, async (req, res) => {
  const id = req.token_data.id;
  const {
    firstname,
    othernames,
    phone,
    state_id,
    gender_id,
    date_of_birth,
    email,
  } = req.body;
  const fetched_tourist = await Tourist.findOne({ where: { id: id } });
  if (!fetched_tourist) {
    res.status(200).json({
      success: false,
      message: "Tourist Not Found",
    });
  } else {
    try {
      const check_update_tourist = await _check_update_tourist(email, id);

      if (Number(check_update_tourist) > 0) {
        return res.status(200).json({
          success: true,
          message: "Email already exist",
        });
      } else {
        fetched_tourist.email = email;
        fetched_tourist.firstname = firstname;
        fetched_tourist.othernames = othernames;
        fetched_tourist.phone = phone;
        fetched_tourist.state_id = state_id;
        fetched_tourist.gender_id = gender_id;
        fetched_tourist.date_of_birth = date_of_birth;
        const new_tourist = await fetched_tourist.save();
        return res.status(200).json({
          success: true,
          message: "Tourist updated successfully",
          data: new_tourist,
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Tourist updation Failed" + err,
        error: err,
      });
    }
  }
});

router.get("/visits", auth, async (req, res) => {
  const tourist_id = req.token_data.id;
  try {
    tourist = await Tourist.findByPk(tourist_id);
    if (!tourist) {
      res.status(200).json({
        success: false,
        message: "Tourist Not Found",
      });
    }
    const tourist_visits = await LandmarkVisit.findAll({
      where: { tourist_id: tourist_id },
      include: [{ model: Landmark, as: "landmark" }],
    });
    res.status(200).json({
      success: true,
      message: "Landmark Visits Fetch Successful",
      data: tourist_visits,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Landmark Visits Not Fetched" + err,
      error: err,
    });
  }
});

async function _check_tourist_email(email) {
  aaa = await Tourist.count({ where: { email: email } });
  return aaa;
}
async function _check_update_tourist(email, id) {
  aaa = await sequelize.query(
    "SELECT COUNT(id) FROM tourists WHERE email = ? AND id <> ?",
    { type: QueryTypes.SELECT, replacements: [email, id] }
  );
  return aaa[0].count;
}
module.exports = router;
