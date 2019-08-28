//adding dependencies
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

//creating new express app
var app = express();

//servers up static files
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
    //getting data from html form
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    //data object for mailchimp API
    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }]
    };

    //turning data into a json object
    var jsonData = JSON.stringify(data);

    //object used in post request
    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/f740b7f7ae",
        method: "POST",
        headers: {
            "Authorization": "griffin1 db85388dfc7cfbfd9e0cfa669e8729fc-us4"
        },
        body: jsonData


    };

    //request to mailchips servers
    request(options, function (error, response, body) {
        //error handleing
        if (error || response.statusCode != 200) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            res.sendFile(__dirname + "/success.html");
        }
    });

});

//post request to redirect to home
app.post("/failure", function (req, res) {
    res.redirect("/");
});


//set server port to 3000 and returns message when it functions correctly
app.listen(3000, function () {
    console.log("server is running on port 3000");
});