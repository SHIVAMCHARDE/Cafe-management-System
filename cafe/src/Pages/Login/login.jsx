import React from 'react'
import '../Login/login.css'

export default function login() {
  return (
    <section>
      <div className="frame">
      <img className='logo_img' src="cafe/src/Assets/logo_btn.pngimg " />
      </div>
    <div className='Login'>
        <h1>Login</h1>
    </div>
    <div className="Login_Box ">
        <input className='Login_text1' placeholder='Enter Your Email/Phone No '></input>
        <input className='Login_text2'placeholder='Enter Your Password '></input>
        
       
    </div>
    <div className="forgot_password">
        <p id='forgot_pass'> <strong>Forgot Password ?</strong></p>
    </div>
    
    <div className="btn-login">
        <button type='submit'className='btn-log'><strong>LOGIN</strong> </button>
    </div>
    </section>
  )
}
