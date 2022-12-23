const mongoose = require("mongoose");

//Schema for Db Document in Collection
const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  year: Number, //this should be a number
});

//Model Class Created from the Scema
const Movies = mongoose.model("movies", movieSchema); //Pascal Naming Convention because of the Class

module.exports = Movies;
