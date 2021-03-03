const mongoose = require("mongoose");

//How to Connect to Mongodb
const dbConnect = async () => {
  await mongoose
    .connect(
      "mongodb+srv://reeleradmin:reeler@cluster0.3nrof.mongodb.net/Reeler",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    ) //This is the Connection String. Local Host is hardcoded but will change depending on the environment
    .then(() => console.log("Connected to MongoDB")) //The connect method returns a Promise. If it's fulfilled, It does this.
    .catch((err) => console.log("Failed to connect to MongoDB...", err));
};

dbConnect();

//Schema for Db Document in Collection
const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  year: Number, //this should be a number
});

//Model Class Created from the Scema
const Movies = mongoose.model("movies", movieSchema); //Pascal Naming Convention because of the Class

module.exports = Movies;
