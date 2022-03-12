////////////////////// Setup Section Start //////////////////////

//jshint esversion:6
const express = require("express");
const ejs = require("ejs");
const mongoose = require ("mongoose");
const port = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB");

////////////////////// Setup Section End //////////////////////

////////////////////// Schema  Section Start //////////////////////

const userSchema = {
    email: String,
    password: String
};

const User = mongoose.model("User", userSchema);

////////////////////// Schema Section End //////////////////////

////////////////////// Get/Post Section Start //////////////////////

app.get("/", function (req, res) {
    res.render("home");
})

app.get("/login", function (req, res) {
    res.render("login");
})

app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
        email: username
    }, function(err, foundUser) {
        if(!err) {
            if(foundUser) {
                if(password === foundUser.password) {
                    res.render("secrets");
                }
            }
        } else {
            console.log(err);
        }
    })
})

app.get("/register", function (req, res) {
    res.render("register");
})

app.post("/register", function(req, res) {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.render("secrets");
        }
    })
})

////////////////////// Get/Post Section End //////////////////////

////////////////////// Main Function Start //////////////////////

app.listen(port, () => {
    console.log("Server started on port " + port);
})

////////////////////// Main Function End //////////////////////