const express = require("express");
//const serverless = require("serverless-http");
const app = express();
const cors = require("cors");
const movies = require("./routes/api");

const port = process.env.PORT || 3500;
var corsOptions = {
  origin: [port, "https://reeler.netlify.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); //add corsOptions as an argument in cors() when deploying to netlify
app.use("/api/movies", movies);
//app.use("/.netlify/functions/index/api/movies", movies); //Router to use Netlify Functions & Access routes from api

//"build": "./node_modules/.bin/netlify-lambda build backend" - Build command

//module.exports.handler = serverless(app);

app.listen(port, () => {
  console.log(`Listening on ${port}....`);
});
