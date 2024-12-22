const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const user_route = require("./routes/user");
const session = require("express-session");
require("dotenv").config();

const port = process.env.PORT || 5000;
const url = process.env.MONGO_CONNECTION_STRING;
const secret = process.env.JWT_SECRET;
const sessionSecret = process.env.SESSION_SECRET;

mongoose.connect(url);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    "/user",
    session({
        secret: sessionSecret,
        resave: true,
        saveUninitialized: true,
    })
);

app.use("/user/auth/*", function auth(req, res, next) {
    //Write the authenication mechanism here
    if (req.session.authorization) {
        let token = req.session.authorization["accessToken"];

        // Verify JWT token
        jwt.verify(token, secret, (err, resp) => {
            if (!err) {
                req.email = resp.data;
                next(); // Proceed to the next middleware
            } else {
                return res
                    .status(403)
                    .json({ message: "User not authenticated" });
            }
        });
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});

app.use("/user", user_route);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
