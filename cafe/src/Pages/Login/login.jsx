import React from 'react'
import '../Login/login.css'
export default function login() {
  return (
    <section>
    <div className='Login'>
        <h1>Login</h1>
    </div>
    <div className="Login_Box ">
        <input className='Login_text'placeholder='Enter Your Email/Phone No '></input>
        <input className='Login_text'placeholder='Enter Your Password '></input>
    </div>
    <div className="btn-login">
        <button type='submit'className='btn-log'>Login</button>
    </div>
    </section>
  )
}
