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
import socketIOClient, { io } from "socket.io-client";
import { useEffect, useState } from 'react';
import FeedBack from './Pages/Feedback/FeedBack';
import Report from './Pages/Report/Report';

function App() {

  const dispatch = useDispatch()
  const { setIsLogged } = bindActionCreators(acitionCreators, dispatch)
  const { setOrderComplete } = bindActionCreators(acitionCreators, dispatch)
  const navigate = useNavigate()
  const ENDPOINT = "http://localhost:6969";
  const socket = socketIOClient(ENDPOINT, {
    withCredentials: true
  });

  const [isOrderComplete, setisOrderComplete] = useState(false)
  const [isSent, setIsSent] = useState(false)


  const user = useSelector(state => state.User)
  const Order = useSelector(state => state.Order)

  useEffect(() => {

    socket.on("connection", data => {
      console.log(data);
    });

    socket.on("orderComplete", data => {

      if (data.status === 200) {

        setisOrderComplete(true)
        navigate(`/feedback?id=${Order.cafe}`)
      }

    })

  }, [])

  useEffect(() => {

    if (isOrderComplete) {

      setOrderComplete({
        isComplete: true,
        data: Order.data,
        orderId: Order.orderId
      })

    }

  }, [isOrderComplete])



  return (
    <>
      <Routes>

        <Route exact path='/' element={user.isAuthenticated ? <CafeSearch /> : <Login />} />

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
        <Route exact path='/feedback' element={<FeedBack />} />

        <Route exact path='/ChefPage' element={<ChefPage />} />

        <Route exact path='/report' element={<Report />} />

      </Routes>
    </>
  );
}

export default App;
