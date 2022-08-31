const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Moviesdb = require("../db/main");
const db = require("../db/connect");
const axios = require("axios");

router.use(express.urlencoded({ extended: true })); //Body Parser
router.use(express.json()); //Body Parser

//Get ALL Movies from DB
let allMovies = [];

//Get All Movies from the Database
const getMovies = async () => {
  db.Connect();
  allMovies = await Moviesdb.find({});
};

//Useless Test Endpoint for Bargain Moto(Test Payment for Kwori API)
router.post("/test-payment", async (req, res) => {
  const body = {
    requestId: req.body.requestId,
    appReference: req.body.appReference,
    secret: req.body.secret,
  };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "https://posapi.usebillbox.com/",
      appId: req.header("appId"),
    },
  };

  axios
    .post(
      "https://posapi.usebillbox.com/webpos/listPayOptions",
      body,
      axiosConfig
    )
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((err) => {
      return res.send(err);
    });
});

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
    ? res.status(404).send("Genre Not Found!!")
    : res.status(200).send(movie);
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
      return res.status(200).send(movie);
    } catch (err) {
      return res.status(400).send(err);
    }
  };
  validator(); //an async function to validate the req.body & post new movie to db
});

//Delete Request for a Movie using the ID
router.delete("/:id", async (req, res) => {
  await getMovies(); //get all movies first
  movie = allMovies.filter((mov) => mov.id == req.params.id);
  if (movie == null || undefined) {
    return res.status(404).send("Movie Not Found!!");
  } else {
    return await Moviesdb.findByIdAndDelete(req.params.id)
      .then((movie) => res.status(200).send(movie))
      .catch((error) => res.status(400).send(error));
  }
});

//Put Request for a Movie using the ID
router.put("/:id", async (req, res) => {
  await getMovies(); //get all movies first
  movie = allMovies.filter((mov) => mov.id == req.params.id);
  if (movie == null || undefined) {
    return res.status(404).send("Movie Not Found!!");
  } else {
    return await Moviesdb.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then(() =>
        Moviesdb.findOne({ _id: req.params.id }).then((response) =>
          res.status(200).send(response)
        )
      )
      .catch((error) => res.status(400).send(error));
  }
});

module.exports = router;
