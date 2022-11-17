import React from 'react'
import '../Password/password.css'

export default function password() {
  return (
    <section>
    <div className="frame">
    <img className='logo_img' src="cafe/src/Assets/logo_btn.pngimg " />
    </div>
  <div className='Register'>
      <h1>Create new password</h1>
  </div>
  <div className='Register1'>
  <h6 id='pass_cond'>Your password must be more than 6 characters</h6>
  </div>
  <div className="Login_Box ">
      <input className='Login_text1'id='' placeholder='Password '></input>
      <input className='Login_text1'id='' placeholder='Confirm Password '></input>
     
  </div>

  <div className="terms_condition">
  <input type="checkbox" id="agree_terms" name="agree_terms" value=" "/>
  <label for="agree_terms" className='terms_statement'> Agree to terms and conditions</label>

  </div>
  
  <div className="btn-login">
      <button type='submit'className='btn-log'><strong>REGISTER</strong> </button>
  </div>
  </section>
  )
}
