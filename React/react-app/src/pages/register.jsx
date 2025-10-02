import React,{useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register=() => {
const navigate = useNavigate();
    const[username ,setUsername] = useState("");
const[password , setPassword] = useState("");

const handleRegister = () => {
    axios.post("http://localhost:3000/signUp", {
        username, password

    })
    .then(res => {
alert(res.data.message);
localStorage.setItem("token" , res.data.token);
navigate("/login");
    })

setUsername("");
setPassword("");



}

    return(
        <div className= "container w-4/5 mx-auto border border-black flex justify-center items-center flex-col min-h-screen">
            <div className = "m-5 w-full max-w-sm">
                <label className = "block mb-2 text-sm font-medium">Username : </label>
                <input    className= "border border-b-black p-2 w-full"
                type = "text"
                placeholder="Username"
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className = "m-5 w-full max-w-sm">
                <label className = "block mb-2 text-sm font-medium">Password : </label>
                <input   className = "border border-b-black p-2 w-full"
                type = "password"
                placeholder="Password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                />
            </div>

            <div className = "m-5">
                <button   className= "border border-black p-2 bg-transparent hover:bg-black hover:text-white transition duration-200"
                onClick= {handleRegister} > Register </button>
            </div>


        </div>
    )
}
export default Register