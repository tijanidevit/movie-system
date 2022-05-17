const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const cors = require("cors");
const UserRoute = require("./routes/User");
const AdminRoute = require("./routes/Administrator");
const MovieRoute = require("./routes/Movie");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
// app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Connected",
  });
  console.log("API Connected");
});

// app.use('/uploads', express.static('uploads'));

app.use("/users/", UserRoute);
app.use("/admin/", AdminRoute);
app.use("/movies/", MovieRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
