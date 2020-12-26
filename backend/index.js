const express = require("express");
const app = express();
//const cors = require("cors");
const port = process.env.PORT || 2876;

//app.use(cors());

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
app.get("/api/movies/:genre", (req, res) => {
  movie = movies.filter((mov) => mov.genre == req.params.genre);
  movie == null || undefined
    ? res.send("Genre Not Found!!").status(404)
    : res.send(movie);
});

app.get("/api/movies", (req, res) => {
  res.send(movies);
});

app.listen(port, () => console.log(`Listening on Port ${port}....`));
