import React from "react";
import axios from "axios";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Signin() {
  const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            alert("Please enter a valid email address");
            return;
        }
        if (password.length < 8) {
            alert("Enter a valid password");
            return;
        }
        try {
            const resp = await axios.post(`${SERVER_URL}/user/login`, {
                "email": email,
                "password": password,
            },{withCredentials: true});
            if(resp.status === 200){
                // document.cookie = `accessToken=${resp.data.accessToken}`;
                navigate("/");
            }
        } catch (err) {
            alert("Not able to login");
            return;
        }
    };
    return (
        <>
            <div id="signinWrapper">
                <div className="logo">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
                        height={40}
                        width={40}
                        alt="Spotify clone"
                    ></img>
                </div>
                <div className="form-head">
                    <h1>Login to Spotify</h1>
                </div>
                <form>
                    <label>Email or Username</label>
                    <input type="email" id="email" placeholder="Email"></input>
                    <label>Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                    ></input>
                    <button type="submit" onClick={handleLogin}>Login</button>
                </form>
                <p>
                    Don't have an account?{" "}
                    <Link to="/signup">Sign up for spotify</Link>
                </p>
            </div>
        </>
    );
}