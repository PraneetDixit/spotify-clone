import React from "react";
import axios from "axios";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Signup() {
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const name = document.getElementById("name").value;
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            alert("Please enter a valid email address");
            return;
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }
        if (name.length < 3) {
            alert("Please enter your name");
            return;
        }
        try {
            const resp = await axios.post(`${SERVER_URL}/user/signup`, {
                "email": email,
                "username":name,
                "password": password,
            });
            if(resp.status === 201){
                navigate("/");
            }
        } catch (err) {
            alert("Email already exists");
            return;
        }
    };

    return (
        <>
            <div id="signupWrapper">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
                    height={40}
                    width={40}
                    alt="Spotify clone"
                ></img>
                <div className="form-head">
                    <h1>Sign up to</h1>
                    <h1>start listening</h1>
                </div>
                <form>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Your name"
                        id="name"
                        required
                    ></input>
                    <label>Email address</label>
                    <input
                        type="email"
                        placeholder="name@domain.com"
                        id="email"
                        required
                    ></input>
                    <label>Set Password</label>
                    <input
                        type="password"
                        placeholder="Set password"
                        id="password"
                        required
                    ></input>
                    <button type="submit" onClick={handleSignup}>
                        Sign Up
                    </button>
                </form>
                <p>
                    Already have an account?
                    <Link to="/signin"> Log in here</Link>
                </p>
            </div>
        </>
    );
}
