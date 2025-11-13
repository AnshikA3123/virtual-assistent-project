import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/signup";
import SignIn from "./pages/signIn";
import Home from "./pages/Home";

import { UserDataContext } from "./context/userContext";
import Customize from "./pages/customize";
import Customize2 from "./pages/customize2";


function App() {
  const{userData,setUserData}=useContext(UserDataContext)
  return (
    <Routes>
      <Route path='/'element={(userData?.assistantImage && userData.assistantName)?  <Home/> :<Navigate to={"/"}/>} />
      <Route path='/signup' element={!userData?<SignUp/> : <Navigate to={"/customize"}/>} />
      <Route path='/signin' element={!userData?<SignIn/> : <Navigate to={"/"}/>} />
        <Route path='/customize' element={userData?<Customize/> : <Navigate to={"/signUp"}/>} />
        <Route path='/customize2' element={userData?<Customize2/> : <Navigate to={"/signUp"}/>} />
   


    </Routes>
  );
}

export default App;
