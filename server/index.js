const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const user_route = require("./routes/user");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;
const url = process.env.MONGO_CONNECTION_STRING;
const secret = process.env.JWT_SECRET;
const sessionSecret = process.env.SESSION_SECRET;
const client = process.env.CLIENT_URL;

mongoose.connect(url);

const app = express();

const corsOptions = {
    origin: client,
    credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    "/user",
    session({
        secret: sessionSecret,
        resave: true,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: 'lax', // Adjust as needed
        },
    })
);

app.use("/user/auth/*", function auth(req, res, next) {
    // console.log("Cookies");
    // console.log(req.cookies);
    // console.log("Session");
    // console.log(req.session);
    // if (req.cookies["accessToken"] || req.session.authorization) {
    if (req.session.authorization) {
        // let token;
        let token = req.session.authorization["accessToken"];
        // if (req.session.authorization) {
            // token = req.session.authorization["accessToken"];
        // }else{
        // token = req.cookies["accessToken"];
        // }
        // console.log(token);
        jwt.verify(token, secret, (err, resp) => {
            if (!err) {
                req.email = resp.data;
                next();
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