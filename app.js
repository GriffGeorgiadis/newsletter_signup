//adding dependencies
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const User = require("./api/models/user");

//creating new express app
var app = express();

mongoose.connect("mongodb+srv://Griff808:" + process.env.MONGO_ATLAS_PW + "@cluster0-1vlrr.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

//servers up static files VYPSVJAODcmS3tx8
app.use(express.static("public"));

//urlencoded set to true to use qs library 
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

//post request for home route
app.post("/", function (req, res) {

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.fName,
        lastName: req.body.lName,
        email: req.body.email
    });
    user.save().then(() => console.log('hello')
    );
    res.sendFile(__dirname + "/success.html");
});

//post request to redirect to home
app.post("/failure", function (req, res) {
    res.redirect("/");
});


//set server port to 3000 and returns message when it functions correctly
app.listen(3000, function () {
    console.log("server is running on port 3000");
});