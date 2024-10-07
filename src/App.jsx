import './App.css'
import './Home.css'
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Nav from './components/Nav';
import Login from './components/Login';
// import SignUp from './components/SignUp';
import SignInfo from './components/SignInfo';
import RequestIdentity from './page/RequestIdentity';
import VerifyEmail from './components/VerifyEmail';
import Homepage from './page/Homepage';
import { store } from './feature/store';
import { Provider } from 'react-redux';
import ApiFetchExample  from './ApiFetch';
import { setLoginUserToken } from './feature/loginToken';
import { setRegisterInfo } from './feature/authSlice';
import { useAppSelector, useAppDispatch } from './hook/Hook';

function MainApp() {
  const location = useLocation();
  const hideNav = ["/home", "/home/newfeed" , "/home/profile"];
  const dispatch = useAppDispatch();

  const userToken = JSON.parse(localStorage.getItem("user") || "{}");
  const registerInfo = JSON.parse(localStorage.getItem("registerInfo") || "{}");
  
  console.log("registerInfo", registerInfo);

  useEffect(() => { 
    dispatch(setLoginUserToken(userToken));
  }, [dispatch]);
  
  useEffect(() =>{
    dispatch(setRegisterInfo(registerInfo));
  })
  const pageSpecificMargin = {
    "/login": "mt-[0px]",
    "/signup": "mt-[0px]",
    "/signup/verify": "mt-[0px]",
    "/signup/verify/requestIdentity": "mt-[20px]"
  };

  return (
    <div className={`${pageSpecificMargin[location.pathname] || 'mt-[0]'}`}>
      {!hideNav.includes(location.pathname) && <Nav />}
      <Routes>
        <Route path='home/*' element={<Homepage />} >
        </Route>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignInfo />} />
        <Route path='/signup/verify' element={<VerifyEmail />} />
        <Route path='/signup/verify/requestIdentity' element={<RequestIdentity />} />
      </Routes>
    </div>
  );
}


function App() {
  return (
   <Provider store={store}>
        <BrowserRouter>
            <MainApp /> {/* Now useLocation works as BrowserRouter is in place */}
            {/* <ApiFetchExample/> */}
        </BrowserRouter>
   </Provider>
    
  );
}

export default App;
