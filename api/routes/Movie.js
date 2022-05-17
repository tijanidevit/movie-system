const express = require("express");
const bodyParser = require("body-parser");
const { Movie, Comment } = require("../models");
const { QueryTypes } = require("sequelize");
const { auth } = require("../middlewares/auth");
const router = express.Router();
const { APP_URL } = require("../config/site");
const slugify = require("slug-generator");
const multer = require("multer");
const cloudinary = require("../helpers/cloudinary");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/movies");
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

router.post("/", upload.single("photo"), async (req, res) => {
  const data = {
    name: req.body.name,
    description: req.body.description,
    rating: req.body.rating,
    genre: req.body.genre,
    ticketPrice: req.body.ticketPrice,
    photo: req.file.path,
    releaseDate: req.body.releaseDate,
    country: req.body.country,
  };

  if (
    !data.name ||
    data.name == undefined ||
    data.name == "" ||
    data.name == null
  ) {
    res.status(200).json({
      success: false,
      message: "Name is required and cannot be empty",
    });
  }

  try {
    const ress = await cloudinary.uploader.upload(req.file.path);
    data.photo = ress.url;
    data.slug = slugify(data.name) + new Date().getTime();
    const movie = await Movie.create(data);
    return res.status(201).json({
      success: true,
      message: "Movie Creation Successful",
      data: movie,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "Movie Creation Failed " + err,
      error: err,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json({
      success: true,
      message: "Movies Fetch Successful",
      data: movies,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Movies Not Fetched",
      error: err,
    });
  }
});
router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    movie = await Movie.findByPk(id, {
      include: [{ model: Category, as: "category" }],
    });
    if (!movie) {
      res.status(200).json({
        success: false,
        message: "Movie Not Found",
      });
    } else {
      movie.comments = await _fetch_movie_comments(id);
      res.status(200).json({
        success: true,
        message: "Movie Fetch Successful",
        data: movie,
      });
    }
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Movie Not Fetched" + err,
      error: err,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findOne({ where: { id: id } });
  if (!movie) {
    res.status(200).json({
      success: false,
      message: "Movie Not Found",
    });
  } else {
    try {
      movie.destroy();
      return res.status(201).json({
        success: true,
        message: "Movie Deleted Successful",
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "Movie Deletion Failed" + err,
        error: err,
      });
    }
  }
});

router.post("/:id/comments", auth, async (req, res) => {
  const user_id = req.token_data.id;
  const movie_id = req.params.id;
  try {
    movie = await Movie.findByPk(movie_id);
    if (!movie) {
      res.status(200).json({
        success: false,
        message: "Movie Not Found",
      });
    }
    comment = await Comment.create({
      user_id: user_id,
      movie_id: movie_id,
    });
    res.status(200).json({
      success: true,
      message: "Comment Added Successfully",
      data: comment,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Movie Not Fetched" + err,
      error: err,
    });
  }
});

router.get("/:id/comments", async (req, res) => {
  const movie_id = req.params.id;
  try {
    movie = await Movie.findByPk(movie_id);
    if (!movie) {
      res.status(200).json({
        success: false,
        message: "Movie Not Found",
      });
    }
    const comments = await Comment.findAll({
      where: { movie_id: movie_id },
      include: [{ model: Tourist, as: "user" }],
    });
    res.status(200).json({
      success: true,
      message: "Movie Visits Fetch Successful",
      data: comments,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Movie Visits Not Fetched" + err,
      error: err,
    });
  }
});

router.get("/search/:key", auth, async (req, res) => {
  const user_id = req.token_data.id;
  const key = req.params.key;
  try {
    movies = await _search_movie(key);
    res.status(200).json({
      success: true,
      message: "Movie Search Results",
      data: movies,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: "Movie Not Fetched" + err,
      error: err,
    });
  }
});

async function _search_movie(key) {
  aaa = await sequelize.query(
    "SELECT * FROM movies WHERE name like '%" + key + "%' ",
    { type: QueryTypes.SELECT }
  );
  return aaa;
}

async function _fetch_movie_comments(movie_id) {
  aaa = await sequelize.query(
    "SELECT * FROM comments LEFT OUTER JOIN comments ON comments.id = movie_comments.comment_id WHERE movie_id = ? ",
    { type: QueryTypes.SELECT, replacements: [movie_id] }
  );
  return aaa;
}
module.exports = router;
