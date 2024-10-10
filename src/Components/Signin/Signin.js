import React from 'react';
import './Signin.css';

export default function Signin() {
  return (
    <>
      <div class='logo'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg' height={40} width={40}></img>
      </div>,
      <div class='form-head'>
        <h1>Login to Spotify</h1>
      </div>,
      <div class='form'>
        <form>
          <label>Email or Username</label>
          <input type='email' placeholder='Email or Username'></input><br></br>
          <label>Password</label>
          <input type='password' placeholder='Password'></input>
        </form>
      </div>,
      <div class='button'><button>Login</button></div>,
      <p><span>Don't have an account? <a href='http://localhost:3000/signup'>Sign up for spotify</a></span></p>
      
    </>
  )
}
