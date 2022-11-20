import React from 'react'
import '../Registration/registration.css'
import axios from 'axios'
import QuickSignIn from '../../Components/QuickSigIn/QuickSigIn'

export default function registraction() {


  function Register() {

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value


    let userData = { name, email }

    var data = JSON.stringify({
      "name": name,
      "email": email,
    })

    var config = {
      method: 'post',
      url: 'http://localhost:6969/auth/register',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {

        alert(JSON.stringify(response.data.msg))
        console.log(JSON.stringify(response.data));
        window.location.href = '/VerifyOTP'

      })
      .catch(function (error) {
        console.log(error);
      });


  }



  return (
    <section className='border'>
      <div className="frame">
        <img className='logo_img' src="cafe/src/Assets/logo_btn.pngimg " />
      </div>
      <div className='Register'>
        <h1>Register</h1>
      </div>
      <div className="Login_Box ">
        <input className='Login_text1' id='name' placeholder='Full Name '></input>
        <input className='Login_text1' id='email' placeholder='Enter Your Email/Phone No '></input>
      </div>
      <div className="forgot_password">
        <p id='forgot_pass'><strong>Forgot Password ?</strong></p>
      </div>

      <div className="terms_condition">
        <input type="checkbox" id="agree_terms" name="agree_terms" value=" " />
        <label for="agree_terms" className='terms_statement'> Agree to terms and conditions and privacy policy</label>

      </div>

      <div className="btn-login">
        <button type='submit' className='btn-log' onClick={() => { Register() }} ><strong>GET OTP</strong> </button>
      </div>

      <QuickSignIn/>

    </section>
  )
}
