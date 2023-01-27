const express = require("express");
const bodyParser = require("body-parser");
const mailChimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mailChimp.setConfig({
    apiKey: "bcb565cf575433a4d3ad7c31746b5449-us18",
    server: "us18"
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
    var email = req.body.email;

    app.post("/", function (req, res) {
        var user = req.body.username;
        var pwd = req.body.password;
        var email = req.body.email;
        const response = mailChimp.lists.addListMember("14d988a883", {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: user,
                LNAME: pwd
            }
        });
        res.sendFile(__dirname + "/result.html");
    });
});


app.listen(3000, function () {
    console.log("Valar Morghulis");
});