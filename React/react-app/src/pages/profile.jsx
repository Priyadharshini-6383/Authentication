import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios';

const Profile = () => {
const {user , dispatch} = useContext(AuthContext);
    const[userName , setUserName]=useState(null);

    const handleLogout = () => {
localStorage.removeItem("token");
dispatch ({
    type : "LOGOUT" 

})
    }

    
    axios.defaults.headers.common["Authorization"] = user;
    const getUserProfile  = async () => {
        await axios.get("http://localhost:3000/Profile")
        .then(res => {
            setUserName(res.data);
        })
        .catch(e => {
            console.log(e);        
        })
    }
    useEffect(() => {
        getUserProfile();
    },[])
    return (
        <div>
Welcome {user && userName}

<br></br>
<button className = 'border border-black' onClick={handleLogout}>Logout </button>
        </div> 
    )
}

export default Profile