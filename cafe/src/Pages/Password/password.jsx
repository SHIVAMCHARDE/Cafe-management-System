import React from 'react'
import '../Password/password.css'
import axios from 'axios'

export default function password() {

  function checkPassword() {

    let pass = document.getElementById('password').value
    let cpass = document.getElementById('cpassword').value

    if (pass === cpass) {

      var data = JSON.stringify({
        "newHash": localStorage.getItem('newHash'),
        "password": pass
      })

      var config = {
        method: 'post',
        url: 'http://localhost:6969/auth/resetPassword',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (response) {

          alert(JSON.stringify(response.data.msg))

          console.log(JSON.stringify(response.data));

          if (response.status === 201) {
            localStorage.removeItem('hash')
            localStorage.removeItem('newHash')
            window.location.href = '/login'
          }



        })
        .catch(function (error) {
          console.log(error);
        });

    }

  }

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
        <input type='password' className='Login_text1' defaultValue='' id='password' placeholder='Password '></input>
        <input type='password' className='Login_text1' defaultValue='' id='cpassword' placeholder='Confirm Password '></input>

      </div>

      <div className="terms_condition">
        <input type="checkbox" id="agree_terms" name="agree_terms" value=" " />
        <label for="agree_terms" className='terms_statement'> Agree to terms and conditions</label>

      </div>

      <div className="btn-login">
        <button type='submit' className='btn-log' onClick={() => { checkPassword() }} ><strong>REGISTER</strong> </button>
      </div>

    </section>
  )
}
