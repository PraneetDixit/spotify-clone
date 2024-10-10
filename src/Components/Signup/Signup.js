import React from 'react';
import './Signup.css';

export default function Signup() {
  return (
    <>
      <div class='logo'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg' height={40} width={40}></img>
      </div>,
      <div class='form-head'>
        <h1>Sign up to</h1>
        <h1>start listening</h1>
      </div>,
      <div class='form'>
        <form>
          <label>Email address</label>
          <input type='email' placeholder='name@domain.com'></input><br></br>
          <label>Set Password</label>
          <input type='password' placeholder='set password'></input>
        </form>
      </div>,
      <div class='option'>
        <a href='#'>Use phone number instead.</a>
      </div>,
      <div class='button'><button>Sign Up</button></div>,
      <p><span>Already have an account?<a href='http://localhost:3000/signin'> Log in here</a></span></p>
      
    </>
  )
}
