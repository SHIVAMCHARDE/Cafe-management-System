import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login/login';
import Registration from './Pages/Registration/registraction';
import OTP from './Pages/OTP/otp';
import Password from './Pages/Password/password';
import Verify from './Pages/Verify/verify';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Registration />} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/verifyOTP' element={<Verify />} />
        <Route exact path='/password' element={<Password />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
