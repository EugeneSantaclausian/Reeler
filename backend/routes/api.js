const express = require("express");
const router = express.Router();
const Joi = require("joi");
//const { get } = require("mongoose");
const Moviesdb = require("../db/main");
const db = require("../db/connect");

router.use(express.urlencoded({ extended: true })); //Body Parser
router.use(express.json()); //Body Parser

//Get ALL Movies from DB
let allMovies = [];

//Get All Movies from the Database
const getMovies = async () => {
  db.Connect();
  allMovies = await Moviesdb.find({});
};

//Get Request for all movies
router.get("/", async (req, res) => {
  await getMovies();
  console.log("All Movies: ", allMovies);
  return res.send(allMovies);
});

//Get request for movies per the genre
router.get("/:genre", async (req, res) => {
  await getMovies(); //get all movies first
  movie = allMovies.filter((mov) => mov.genre == req.params.genre);
  movie == null || undefined
    ? res.send("Genre Not Found!!").status(404)
    : res.send(movie);
  return console.log(`${req.params.genre} movies are:`, movie);
});

//Creating a New Movie in the Database
const createMovie = async (data) => {
  const movie = new Moviesdb({
    title: data.title,
    genre: data.genre,
    year: data.year,
  });

  const result = await movie.save(); //method for saving to database
  console.log("Movie Stored IN DB:", result);
};

//Post Request for  A New Movie
router.post("/", (req, res) => {
  //Movie Object from Request Body
  const movie = {
    //id: movies.length + 1,
    title: req.body.title,
    genre: req.body.genre,
    year: req.body.year,
  };

  //Joi Schema for Input Validation
  const schema = Joi.object({
    title: Joi.string().max(30).required(),
    genre: Joi.string().max(30).required(),
    year: Joi.number().min(4).required(),
  });

  const validator = async () => {
    try {
      await schema.validateAsync(movie); //Validates
      await createMovie(movie);
      ///movies.unshift(movie);
      return res.send(movie).status(200);
    } catch (err) {
      return res.send(err).status(400);
    }
  };
  validator(); //an async function to validate the req.body
});

router.delete("/:id", async (req, res) => {
  await getMovies(); //get all movies first
  movie = allMovies.filter((mov) => mov.id == req.params.id);
  if (movie == null || undefined) {
    return res.send("Movie Not Found!!").status(404);
  } else {
    await movie.findByIdandRemove(req.params.id);
    return res.send(movie).status(200);
  }
});

//app.listen(port, () => console.log(`Listening on Port ${port}....`));
module.exports = router;
