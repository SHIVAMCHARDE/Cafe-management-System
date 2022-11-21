import React from 'react'
import '../Login/Login.css'
import axios from 'axios'
import backIcon from '../../Assets/logo_btn.png'
import { setIsLogged } from '../../States/action-creators/index'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { acitionCreators } from '../../States/index'

export default function Login() {

  const dispatch = useDispatch()
  const { setIsLogged } = bindActionCreators(acitionCreators, dispatch)

  function loginUser() {

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    console.log(email);

    var data = JSON.stringify({
      "email": email,
      "password" : password
    })

    var config = {
      method: 'post',
      url: 'http://localhost:6969/auth/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {

        alert(JSON.stringify("Login Successfull"))
        
        setIsLogged(response.data)

        localStorage.removeItem('newHash')


      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          alert(error.response.data.msg)
        }
      });


  }

  return (
    <section>
      <div className="frame">
        <img className='logo_img' src={backIcon} />
      </div>
      <div className='Login'>
        <h1>Login</h1>
      </div>
      <div className="Login_Box ">

        <input defaultValue='' id='email' type='text' className='Login_text1' placeholder='Enter Your Email/Phone No '></input>
        <input defaultValue='' id='password' type='password' className='Login_text2' placeholder='Enter Your Password '></input>


      </div>
      <div className="forgot_password">
        <p id='forgot_pass'> <strong>Forgot Password ?</strong></p>
      </div>

      <div className="btn-login">
        <button type='submit' className='btn-log' onClick={() => { loginUser() }} ><strong>LOGIN</strong> </button>
      </div>
    </section>
  )
}
