import './App.css'
import { useState, useEffect } from "react";
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Nav from './components/Nav';
import Login from './components/Login';
// import SignUp from './components/SignUp';
import SignInfo from './components/SignInfo';
import RequestIdentity from './page/RequestIdentity';
import VerifyEmail from './components/VerifyEmail';
import Homepage from './page/Homepage';


function App() {

  return (
      <main>
            <BrowserRouter>
                <Nav/><br></br><br></br><br></br>
                <Routes>
                  <Route path='/' element={<Homepage/>}></Route> 
                  <Route path='/login' element={<Login/>}></Route>
                  <Route path='/signup' element={<SignInfo/>}></Route>
                  <Route path='/signup/verify' element={<VerifyEmail/>}></Route>
                  <Route path='/signup/verify/requestIdentity' element={<RequestIdentity/>}></Route>
                </Routes>
            
            </BrowserRouter>
      </main>
  )
}

export default App;
