import React from 'react'
import '../Registration/registration.css'

export default function registraction() {
  return (
    <section>
    <div className="frame">
    <img className='logo_img' src="cafe/src/Assets/logo_btn.pngimg " />
    </div>
  <div className='Register'>
      <h1>Register</h1>
  </div>
  <div className="Login_Box ">
      <input className='Login_text1'id='' placeholder='Full Name '></input>
      <input className='Login_text1'id='' placeholder='Enter Your Email/Phone No '></input>
      <input className='Login_text1'id='' placeholder='Password '></input>
      <input className='Login_text2'id='' placeholder='Confirm Password  '></input>
      
     
  </div>
  <div className="forgot_password">
      <p id='forgot_pass'><strong>Forgot Password ?</strong></p>
  </div>

  <div className="terms_condition">
  <input type="checkbox" id="agree_terms" name="agree_terms" value=" "/>
  <label for="agree_terms" className='terms_statement'> Agree to terms and conditions and privacy policy</label>

  </div>
  
  <div className="btn-login">
      <button type='submit'className='btn-log'><strong>REGISTER</strong> </button>
  </div>
  </section>
  )
}
