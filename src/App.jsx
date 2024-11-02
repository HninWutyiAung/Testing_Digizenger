import './App.css'
import './Home.css'
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation , Navigate, useNavigate } from "react-router-dom";
import Nav from './components/Nav/Nav';
import Login from './components/Auth/Login';
import SignInfo from './components/Auth/SignInfo';
import RequestIdentity from './page/RequestIdentity';
import VerifyEmail from './components/Auth/VerifyEmail';
import Homepage from './page/Homepage';
import { store } from './feature/store';
import { Provider } from 'react-redux';
import ApiFetchExample  from './ApiFetch';
import { setLoginUserToken , selectIsLogged} from './feature/loginToken';
import { useAppSelector, useAppDispatch } from './hook/Hook';
import { WebSocketProvider } from './components/Websocket/websocketForLikeNoti';
import { useGetAllNotiQuery } from './apiService/Noti';
import { HandleNoti } from './components/Notification/LikeNoti/NotiService';
import { selectNotification } from './feature/notiSlice';


function MainApp() {
  const location = useLocation();
  const hideNav = ["/home", "/home/newfeed" , "/home/profile" , "/home/profile/:otherUserName"];
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLogged);
  const navigate = useNavigate();
  const {data:noti,isSuccess} = useGetAllNotiQuery();
  const allNoti = useAppSelector(selectNotification);

  console.log(allNoti);


  const shouldHideNav = hideNav.includes(location.pathname) || /^\/home\/profile\/[^/]+$/.test(location.pathname);

  const userToken = JSON.parse(localStorage.getItem("user") || "{}")

  useEffect(() => {
    if (isSuccess && noti) {
        HandleNoti(noti);
    }
}, [isSuccess, noti]);


  useEffect(() => { 
    dispatch(setLoginUserToken(userToken));
  }, [dispatch]);
  
  const pageSpecificMargin = {
    "/login": "mt-[0px]",
    "/signup": "mt-[0px]",
    "/signup/verify": "mt-[0px]",
    "/signup/verify/requestIdentity": "mt-[20px]"
  };


  useEffect(() => {
    if (isLoggedIn) {
      const lastPath = localStorage.getItem("lastPath");
      if (lastPath === "/") {
        localStorage.setItem("lastPath", "/home/newfeed"); 
      }
    }else {
      localStorage.setItem("lastPath", "/home/newfeed");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("lastPath", location.pathname); 
    }
  }, [location.pathname, isLoggedIn]);

  const lastPath = localStorage.getItem("lastPath") || "/home/newfeed";

 
  console.log(isLoggedIn)
  return (
    <div className={`${pageSpecificMargin[location.pathname] || 'mt-[0]'}`}>
      {!shouldHideNav  && <Nav />}
      <Routes>
        <Route path='home/*' element={isLoggedIn ? <Homepage /> : <Navigate to="/"/>} >
        </Route>
        <Route path="/" element={isLoggedIn ? <Navigate to={lastPath} replace /> : <Login />} />
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
    <WebSocketProvider> 
      <BrowserRouter>
        <MainApp /> 
        {/* <ApiFetchExample/> */}
      </BrowserRouter>
    </WebSocketProvider>
  </Provider>
    
  );
}

export default App;
