import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registraction';
import OTP from './Pages/OTP/Otp';
import Password from './Pages/Password/Password';
import Verify from './Pages/Verify/Verify';
import Home from './Pages/Home/Home'
import Search from './Pages/Search/Search'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CafePage from './Pages/CafePage/CafePage'

import { setIsLogged } from './States/action-creators/index'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { acitionCreators } from './States/index'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import CafeProfile from './Pages/CafeProfile/CafeProfile';
import Orders from './Pages/Orders/Orders';


function App() {

  const dispatch = useDispatch()
  const { setIsLogged } = bindActionCreators(acitionCreators, dispatch)
  const navigate = useNavigate()

  const user = useSelector(state => state.User)

  

  return (
    <>
      <Routes>
        <Route exact path='/' element={  user.isAuthenticated ? <Home/> : <Login/>  }  /> :
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Registration />} />
        <Route exact path='/verifyOTP' element={<Verify />} />
        <Route exact path='/password' element={<Password />} />
        <Route exact path='/Search' element={<Search />} />
        <Route exact path='/CafePage' element={<CafePage/>} />

        <Route exact path='/home' element={<Home />} />
        <Route exact path='/profile' element={<CafeProfile />} />
        <Route exact path='/order' element={<Orders />} />
      </Routes>
    </>
  );
}

export default App;
