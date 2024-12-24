const express = require("express");
const user_route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {nanoid} = require("nanoid");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

const Users = require("../models/users");
const Playlists = require("../models/playlists")

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

            // Auto login after registration
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
            await req.session.save();
            return res.status(201).json({message:"User successfully registered and logged in", accessToken: accessToken});
            // res.status(201).json({ message: "Registered successfully" });
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

            await req.session.save();

            req.cookies.accessToken = accessToken;

            return res.status(200).send("User successfully logged in");
        }
        res.status(400).json({ message: "Incorrect password" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

user_route.post("/logout", async (req, res) => {
    req.session.authorization = "";
    await req.session.destroy();
    res.status(200).json({ message: "User logged out" });
});

user_route.get("/auth", async (req, res) => {
    const email = req.email;
    console.log(email);
    try {
        const user = await Users.findOne({ email: email });
        res.status(200).json(user);
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

user_route.post("/auth/playlist", async (req,res)=>{
    const email = req.email;
    try{
        const user = await Users.findOne({email:email});
        user.shareID = user.shareID? user.shareID : nanoid();
        await user.save();
        let playlist = await Playlists.findOne({id:user.shareID});
        if(playlist){
            playlist.liked = user.liked;
        }else{
            playlist = new Playlists({
                id: user.shareID,
                user: user.username,
                liked: user.liked
            });
        }
        playlist.save();
        res.status(201).json({message:"Playlist created successfully", data: user.shareID});
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

user_route.get("/playlist/:id", async (req,res)=>{
    const id = req.params.id;
    try{
        const playlist = await Playlists.findOne({id:id});
        res.status(200).json({id: playlist.id, user: playlist.user, liked: playlist.liked});
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

module.exports = user_route;
