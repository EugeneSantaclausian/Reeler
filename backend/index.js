const express = require("express");
const app = express();
const cors = require("cors");
const movies = require("./routes/api");

const port = process.env.PORT || 3500;
var corsOptions = {
  origin: [port, "https://reeler.netlify.app", "http://127.0.0.1:5500"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); //add corsOptions as an argument in cors() when deploying to netlify
app.use("/api/movies", movies);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, HEAD, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, content-type, Accept"
  );
  next();
});

app.listen(port, () => {
  console.log(`Listening on ${port}....`);
});
