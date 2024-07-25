const express = require("express");
const path = require('path');
const dotEnv = require('dotenv');
dotEnv.config();
const bodyParser = require("body-parser");
const mailChimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }));

mailChimp.setConfig({
    apiKey: process.env.API_KEY,
    server: "us18"
});
console.log(process.env.API_KEY);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")

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
        console.log(response);
        res.sendFile(__dirname + "/result.html");
    });
});


app.listen(3000, function () {
    console.log("Valar Morghulis");
});