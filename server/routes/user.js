const express = require("express");
const user_route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

const Users = require("../models/users");

user_route.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await Users.find({ email: email });
        if (existingUser.length) {
            return res.status(400).json({ message: "User already exists" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new Users({
                username: username,
                email: email,
                password: hashedPassword,
            });
            await user.save();
            res.status(201).json({ message: "Registered successfully" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

user_route.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res
                .status(400)
                .json({ message: "User not found. SignUp to continue." });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            let accessToken = jwt.sign(
                {
                    data: email,
                },
                secret,
                { expiresIn: 60 * 60 * 24 }
            );

            req.session.authorization = {
                accessToken,
                email,
            };
            return res.status(200).send("User successfully logged in");
        }
        res.status(400).json({ message: "Incorrect password" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

user_route.post("/logout", async (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: "User logged out" });
});

user_route.get("/auth/", async (req, res) => {
    const email = req.email;
    try {
        const user = await Users.findOne({ email: email });
        const liked = user.liked;
        res.status(200).json(liked);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

user_route.put("/auth/like", async (req, res) => {
    const email = req.email;
    const liked = req.body.liked;
    try {
        const user = await Users.findOne({ email: email });
        user.liked = liked;
        await user.save();
        res.status(200).json({ message: "Liked successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = user_route;
