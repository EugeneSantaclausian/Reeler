/*
-----QUESTION-----
​
1. Create a simple class called "UserClass"
2. This "UserClass" should have the following properties:
- id: Should be a number, preferrably - 1, 2, 3... in that order
- name : User's name as a string
- age : User's age asge as number
- type: type of user("free"/"premium"), this should also be a string.
- subscriptionFee: This should be a number representing the fee charged for the user to pay. eg: 500, 200 etc.
​
3. From this UserClass, create 5 Objects representing 5 separate Users.
4. Each User Object from the UserClass can be called "userOne", "userTwo", "userThree" etc in that order.
5. Make sure that some userObjects will be on "free" subscription(i.e type: "free" & subscriptionFee: 0) whilst
   others will be on "premium" subscription(i.e type: "premium" & subsscriptionFee: 500 etc etc).
   Find a way to go about this question as this might not exactly be a straight forward answer.
6. Once you have your User Objects ready, do the following:
7. Create an api to handle GET & POST requests from the client
8. The GET request should be for the following:
- To get a single user object
- To get all premium users
- To get all free users
9. Also use JOI to perform an INPUT VALIDATION for the POST request.
10. Note that the Link to the JOI API has been provided in the Code School Slack page.
​
Happy Coding!!!!!!
*/

//console.log("TEST IS WOrkinmgn.");

const Joi = require("joi"); //Joi is for validating the user input to be posted
const express = require("express");
const app = express();
const port = process.env.PORT || 3900;
app.use(express.json()); //enable bodyparser in express - its a middleware

class User {
  constructor(id, name, age, type, subFee) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.type = type;
    this.subFee = subFee;
  }
}

const userOne = new User(1, "James Smith", 18, "free", 0);
const userTwo = new User(2, "Freda Jones", 28, "free", 0);
const userThree = new User(3, "Vida Asante", 24, "premium", 45);
const userFour = new User(4, "Fiifi Hanson", 22, "free", 0);
const userFive = new User(5, "Dennis Daniels", 35, "premium", 500);
const myUsers = [userOne, userTwo, userThree, userFour, userFive];
//console.log(myUsers);

//Get Class by Class Id
app.get("/api/users/:classid", (req, res) => {
  user = myUsers.find((myclass) => myclass.id == parseInt(req.params.classid));
  console.log("USERCLASS:", user);
  user == null || undefined
    ? res.send("CLASS NOT FOUND").status(404)
    : res.send(user).status(200);
});

//Get User Type - i.e Premium or Free
app.get("/api/users/type/:usertype", (req, res) => {
  user = myUsers.filter((myclass) => myclass.type == req.params.usertype);
  user == null || undefined
    ? res.send("USER TYPE FOUND").status(404)
    : res.send(user).status(200);
});

//Get all Users
app.get("/api/users", (req, res) => {
  return res.send(myUsers);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
