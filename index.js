const express = require("express");
const app = express();
const cors = require("cors");
const movies = require("./routes/api");

const port = process.env.PORT || 3500;
var corsOptions = {
  origin: [port, "https://reeler.netlify.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); //add corsOptions as an argument in cors() when deploying to netlify
app.use("/api/movies", movies);

app.listen(port, () => {
  console.log(`Listening on ${port}....`);
});
