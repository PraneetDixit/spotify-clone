import React from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <>
    <div id="signupWrapper">
      <div className='logo'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg' height={40} width={40} alt='Spotify clone'></img>
      </div>,
      <div className='form-head'>
        <h1>Sign up to</h1>
        <h1>start listening</h1>
      </div>,
      <div className='form'>
        <form>
          <label>Email address</label>
          <input type='email' placeholder='name@domain.com'></input><br></br>
          <label>Set Password</label>
          <input type='password' placeholder='set password'></input>
        </form>
      </div>,
      <div className='option'>
        <a href='/'>Use phone number instead.</a>
      </div>,
      <div className='button'><button>Sign Up</button></div>,
      <p><span>Already have an account?<Link to='/signin'> Log in here</Link></span></p>
     </div> 
    </>
  )
}
