import React from 'react';
import './Signin.css';
import { Link } from 'react-router-dom';

export default function Signin() {
  return (
    <>
    <div id="signinWrapper">
      <div className='logo'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg' height={40} width={40} alt='Spotify clone'></img>
      </div>,
      <div className='form-head'>
        <h1>Login to Spotify</h1>
      </div>,
      <div className='form'>
        <form>
          <label>Email or Username</label>
          <input type='email' placeholder='Email or Username'></input><br></br>
          <label>Password</label>
          <input type='password' placeholder='Password'></input>
        </form>
      </div>,
      <div className='button'><button>Login</button></div>,
      <p><span>Don't have an account? <Link to='/signup'>Sign up for spotify</Link></span></p>
      </div>
    </>
  )
}
