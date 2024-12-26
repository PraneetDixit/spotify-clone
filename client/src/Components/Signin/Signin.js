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
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
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
                <div id="signinInnerWrapper">
                <div className="logo">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Music_logo.png"
                        height={50}
                        width={50}
                        alt="SWGfy"
                    ></img>
                </div>
                <div className="form-head">
                    <h1>Login to SWGfy</h1>
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
                    Don't have an account?&nbsp;
                    <Link to="/signup">Sign up for SWGfy</Link>
                </p>
                </div>
            </div>
        </>
    );
}
