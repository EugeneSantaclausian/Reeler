const express = require("express");
const serverless = require("serverless-http");
const app = express();
const cors = require("cors");
const movies = require("./routes/api");

const port = "https://reeler.netlify.app";
var corsOptions = {
  origin: port,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); //add corsOptions as an argument in cors() when deploying to netlify
app.use("/.netlify/functions/index/api/movies", movies); //Router to use Netlify Functions & Access routes from api

module.exports.handler = serverless(app);
