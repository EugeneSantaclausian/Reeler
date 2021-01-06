const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const cors = require("cors");
const Joi = require("joi");
//const port = process.env.PORT || 2876;

app.use(cors());
app.use("/.netlify/functions/index", router); //Router to use Netlify Functions
router.use(express.urlencoded({ extended: true })); //Body Parser
router.use(express.json()); //Body Parser

const movies = [
  { id: 1, title: "Jungle Book", genre: "Animation", year: 2003 },
  { id: 2, title: "Justice League", genre: "Action", year: 2016 },
  { id: 3, title: "Home Alone", genre: "Comedy", year: 1996 },
  {
    id: 4,
    title: "Harry Potter & The Socerer's Stone",
    genre: "Mystery",
    year: 2007,
  },
  { id: 5, title: "Lion King", genre: "Animation", year: 2004 },
  { id: 6, title: "Avengers End Game", genre: "Action", year: 2018 },
  { id: 7, title: "The Devil Wears Prada", genre: "Comedy", year: 2007 },
  {
    id: 4,
    title: "Chronicles of Narnia",
    genre: "Mystery",
    year: 2012,
  },
];

//Get request for movies per the genre
router.get("/api/movies/:genre", (req, res) => {
  movie = movies.filter((mov) => mov.genre == req.params.genre);
  movie == null || undefined
    ? res.send("Genre Not Found!!").status(404)
    : res.send(movie);
});

router.get("/api/movies", (req, res) => {
  res.send(movies);
});

//Post Request for  A New Movie
router.post("/api/movies", (req, res) => {
  //Joi Schema for Input Validation
  const schema = Joi.object({
    title: Joi.string().max(30).required(),
    genre: Joi.string().max(30).required(),
    year: Joi.number().min(3).max(4).required(),
  });

  try {
    const result = schema.validateAsync(req.body);
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  //Movie Object from Request Body
  const movie = {
    id: movies.length + 1,
    title: req.body.title,
    genre: req.body.genre,
    year: req.body.year,
  };
  //Push movie to Movies
  movies.unshift(movie);
  console.log("REQ.BODY:", req.body);
  //Return Response to Client
  res.send(movie);
});

//app.listen(port, () => console.log(`Listening on Port ${port}....`));
module.exports.handler = serverless(app);
