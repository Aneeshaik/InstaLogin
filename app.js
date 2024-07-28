const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const mailChimp = require("@mailchimp/mailchimp_marketing");
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

mailChimp.setConfig({
    apiKey: process.env.API_KEY,
    server: process.env.SERVER
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
    var email = req.body.email;
    app.post("/", async function (req, res) {
        var user = req.body.username;
        var pwd = req.body.password;
        var email = req.body.email;
        console.log("Received data:", { user, pwd, email });

        try {
            const response = await mailChimp.lists.addListMember("14d988a883", {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: user,
                    LNAME: pwd
                }
            });
    
            console.log("Mailchimp response:", response);
            console.log("API Key used:", process.env.API_KEY);
    
            res.sendFile(__dirname + "/result.html");
        } catch (error) {
            console.error("Error adding member to Mailchimp:", error.response ? error.response.body : error);
            res.status(500).send("Error adding member to Mailchimp");
        }
        //then will take function 
        // .then((response) => {   // I was getting promsie {Pending} when doing console.log(response). So, I treid then and it worked. If you don't want to log then it'll work without then also
        //     console.log(response);
        // })
        console.log(process.env.API_KEY);
        res.sendFile(__dirname + "/result.html");
    });
});

app.listen(3000, function () {
    console.log("Valar Morghulis");
});