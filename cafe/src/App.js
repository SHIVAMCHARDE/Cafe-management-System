import './App.css';
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registraction'
import Password from './Pages/Password/Password';
import Verify from './Pages/Verify/Verify';
import { Routes, Route } from 'react-router-dom'
import CafePage from './Pages/CafeSearch/CafeSearch'
import { setIsLogged } from './States/action-creators/index'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { acitionCreators } from './States/index'
import { useNavigate } from 'react-router-dom'
import CafeProfile from './Pages/CafeProfile/CafeProfile';
import Orders from './Pages/Orders/Orders';
import CafeSearch from './Pages/CafeSearch/CafeSearch';
import CafeForm from './Pages/CafeForm/CafeForm';
import PaymentSuceessPage from './Pages/PaymentSuceessPage/PaymentSuceessPage';
import ChefPage from './Pages/ChefPage/ChefPage';
import socketIOClient from "socket.io-client";
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch()
  const { setIsLogged } = bindActionCreators(acitionCreators, dispatch)
  const navigate = useNavigate()
  const ENDPOINT = "http://localhost:6969";
  const socket = socketIOClient(ENDPOINT, {
    withCredentials: true
  });


  const user = useSelector(state => state.User)

  useEffect(() => {

    socket.on("connection", data => {
      console.log(data);
    });

    socket.on("noice", data => {
      console.log(data);
    });

    socket.on("orderComplete", data => {
      console.log(data);
    });

  }, [])





  return (
    <>
      <Routes>

        <Route exact path='/' element={user.isAuthenticated ? <CafeSearch /> : <Login />} /> :

        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Registration />} />
        <Route exact path='/verifyOTP' element={<Verify />} />
        <Route exact path='/password' element={<Password />} />

        <Route exact path='/home' element={<CafeSearch />} />
        <Route exact path='/profile' element={<CafeProfile />} />

        <Route exact path='/order' element={<Orders />} />
        <Route exact path='/CafePage' element={<CafePage />} />
        <Route exact path='/CafeForm' element={<CafeForm />} />

        <Route exact path='/paymentSuccess' element={<PaymentSuceessPage />} />

        <Route exact path='/ChefPage' element={<ChefPage />} />

      </Routes>
    </>
  );
}

export default App;
