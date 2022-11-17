import React from 'react'
import '../Verify/verify.css'

export default function verify() {
  return (
    <section>
        <div className="frame">
    <img className='logo_img' src="cafe/src/Assets/logo_btn.pngimg " />
    </div>
    <div className='Register'>
      <h1>OTP Verification</h1>
  </div>
  <div className='Register1'>
  <h6 id='pass_cond'>Enter the verification code we just sent on your Email/Mobile no.</h6>
  </div>
  <div className='get-otp'>
        <div className="grid-item"></div>
  </div>

  <div className="btn-login">
      <button type='submit'className='btn-log'><strong>Verify</strong> </button>
  </div>

  <div className='receive-code'>
    <h6>Didn't receive code ? Receive code</h6>
  </div>

    </section>
  )
}
