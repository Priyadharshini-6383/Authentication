import React, { useContext } from "react";
import {BrowserRouter as Router,Routes , Route  } from 'react-router-dom';
import Register from "./pages/register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { AuthContext } from "./Context/AuthContext";


const  App = () => {
    const {user} = useContext(AuthContext)

    return (

        <Router>
        <Routes>

             <Route path='/login' element = {<Login/>}/> 
             <Route path="/register" element= {<Register/>}/>
               <Route path='/profile'element = {user ? <Profile/> : <Login />}/> 
        </Routes>
        </Router>
    )

}

export default App
