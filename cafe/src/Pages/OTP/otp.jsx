import React from 'react'
import '../OTP/otp.css'

export default function otp() {
  return (
    <section>
    <div className="frame">
    <img className='logo_img' src="cafe/src/Assets/logo_btn.pngimg " />
    </div>
  <div className='Login'>
      <h1>Register</h1>
  </div>
  <div className="Login_Box ">
      <input className='Login_text1' placeholder='Full Name '></input>
      <input className='Login_text2'placeholder='Email/Mobile no.'></input>
      
     
  </div>
  <div className="forgot_password">
      <p id='forgot_pass1'> <strong>Forgot Password ?</strong></p>
  </div>
  
  <div className="btn-login">
      <button type='submit'className='btn-log'><strong>Get OTP</strong> </button>
  </div>
  </section>
  )
}
