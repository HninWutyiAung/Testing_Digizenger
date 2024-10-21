import './App.css'
import './Home.css'
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation , Navigate, useNavigate } from "react-router-dom";
import Nav from './components/Nav/Nav';
import Login from './components/Auth/Login';
// import SignUp from './components/SignUp';
import SignInfo from './components/Auth/SignInfo';
import RequestIdentity from './page/RequestIdentity';
import VerifyEmail from './components/Auth/VerifyEmail';
import Homepage from './page/Homepage';
import { store } from './feature/store';
import { Provider } from 'react-redux';
import ApiFetchExample  from './ApiFetch';
import { setLoginUserToken , selectIsLogged} from './feature/loginToken';
import { setRegisterInfo } from './feature/authSlice';
import { useAppSelector, useAppDispatch } from './hook/Hook';

function MainApp() {
  const location = useLocation();
  const hideNav = ["/home", "/home/newfeed" , "/home/profile" ,"/home/newfeed/message"];
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLogged);
  const navigate = useNavigate();
  const [firstTimeLogin , setFirstTimeLogin] = useState(true);

  const userToken = JSON.parse(localStorage.getItem("user") || "{}")

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
    // Check if user is logged in and localStorage lastPath is "/"
    if (isLoggedIn) {
      const lastPath = localStorage.getItem("lastPath");
      if (lastPath === "/") {
        localStorage.setItem("lastPath", "/home/newfeed"); // Set to home/newfeed if lastPath is "/"
      }
    }
  }, [isLoggedIn]);

  // Store the current path in localStorage when it changes
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("lastPath", location.pathname); // Store path for logged-in user
    }
  }, [location.pathname, isLoggedIn]);

  const lastPath = localStorage.getItem("lastPath") || "/home/newfeed";

 
  console.log(isLoggedIn)
  return (
    <div className={`${pageSpecificMargin[location.pathname] || 'mt-[0]'}`}>
      {!hideNav.includes(location.pathname) && <Nav />}
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
        <BrowserRouter>
            <MainApp /> {/* Now useLocation works as BrowserRouter is in place */}
            {/* <ApiFetchExample/> */}
        </BrowserRouter>
   </Provider>
    
  );
}

export default App;
