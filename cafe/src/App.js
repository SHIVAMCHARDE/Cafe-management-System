import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/registraction';
import OTP from './Pages/OTP/otp';
import Password from './Pages/Password/password';
import Verify from './Pages/Verify/verify';
import Home from './Pages/Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { setIsLogged } from './States/action-creators/index'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { acitionCreators } from './States/index'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';


function App() {

  const dispatch = useDispatch()
  const { setIsLogged } = bindActionCreators(acitionCreators, dispatch)
  const navigate = useNavigate()

  const user = useSelector(state => state.User)

  

  return (
    <>
      <Routes>
        <Route exact path='/' element={  user.isAuthenticated ? <Home/> : <Login/>  }  /> :
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Registration />} />
        <Route exact path='/verifyOTP' element={<Verify />} />
        <Route exact path='/password' element={<Password />} />

      </Routes>
    </>
  );
}

export default App;
