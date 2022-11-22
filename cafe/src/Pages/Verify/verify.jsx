import React from 'react'
import '../Verify/verify.css'
import axios from 'axios'

export default function verify() {

  function verifyOTP() {

    const inp1 = document.getElementById('1').value
    const inp2 = document.getElementById('2').value
    const inp3 = document.getElementById('3').value
    const inp4 = document.getElementById('4').value

    let otp = parseInt(inp1 + inp2 + inp3 + inp4)

    let email = ((window.location.href).split('=')[1]).split('&')[0]
    console.log(email);
    let fullName = (window.location.href).split('fullName=')[1]

    var data = JSON.stringify({
      "email": email,
      "fullName": decodeURI(fullName),
      "hash": localStorage.getItem('hash'),
      "otp": otp
    })

    var config = {
      method: 'post',
      url: 'http://localhost:6969/auth/verifyOTP',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {

        alert(JSON.stringify(response.data.msg))
        console.log(response.status);

        if (response.status === 202) {

          console.log(JSON.stringify(response.data));
          localStorage.setItem('newHash', response.data.hash)
          localStorage.removeItem('hash')

          window.location.href = '/password'

        } 
        else if (response.status === 504) {
          localStorage.removeItem('hash')
        }

      })
      .catch(function (error) {
        console.log(error);
      });


  }


  function nextInput(inpValue) {

    if (parseInt(inpValue) == 4) {
      const Inp = document.getElementById(inpValue)
      Inp.className = 'OTP-code-input OTP-active'
    }
    else {
      const Inp = document.getElementById(inpValue)
      Inp.className = 'OTP-code-input OTP-active'
      const nextInp = document.getElementById(parseInt(inpValue) + 1)
      nextInp.focus()
    }


  }

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
        <input type="text" id='1' maxLength={1} onChange={() => { nextInput('1') }} className="OTP-code-input" />
        <input type="text" id='2' maxLength={1} onChange={() => { nextInput('2') }} className="OTP-code-input" />
        <input type="text" id='3' maxLength={1} onChange={() => { nextInput('3') }} className="OTP-code-input" />
        <input type="text" id='4' maxLength={1} onChange={() => { nextInput('4') }} className="OTP-code-input" />
      </div>

      <div className="btn-login">
        <button type='submit' onClick={() => { verifyOTP() }} className='btn-log'><strong>Verify</strong> </button>
      </div>

      <div className='receive-code'>
        <h6>Didn't receive code ? Receive code</h6>
      </div>

    </section>
  )
}
