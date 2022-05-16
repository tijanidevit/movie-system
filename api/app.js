const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const cors = require("cors");
const TouristRoute = require("./routes/Tourist");
const GenderRoute = require("./routes/Gender");
const StateRoute = require("./routes/State");
// const LandmarkRoute = require('./routes/Landmark');
const CategoryRoute = require("./routes/Category");
const ServiceRoute = require("./routes/Service");
const PasswordRoute = require("./routes/Password");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// var corsOptions = {
//     origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));
app.use(cors());

app.get("/", (req, res) => {
  console.log("Xpat");
});

// app.use('/uploads', express.static('uploads'));

app.use("/tourists", TouristRoute);

app.use("/genders", GenderRoute);
app.use("/states", StateRoute);
app.use("/landmarks/", require("./routes/Landmark"));
app.use("/services/", ServiceRoute);
app.use("/categories/", CategoryRoute);
app.use("/password/", PasswordRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
