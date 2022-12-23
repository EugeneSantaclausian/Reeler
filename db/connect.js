const mongoose = require("mongoose");
const prod_uri =
  "mongodb+srv://reeleradmin:reeler@cluster0.3nrof.mongodb.net/Reeler?retryWrites=true&w=majority";
const dev_uri = "mongodb://localhost:27017/reeler";

const dbConnect = async () => {
  await mongoose
    .connect(prod_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }) //This is the Connection String. Local Host is hardcoded but will change depending on the environment
    .then(() => console.log("Connected to MongoDB")) //The connect method returns a Promise. If it's fulfilled, It does this.
    .catch((err) => console.log("Failed to connect to MongoDB...", err));
};

dbConnect();
console.log("Main is active");

module.exports.Connect = dbConnect;
