const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");



const dotenv = require("dotenv");
dotenv.config();

const router = require("./router");
const PORT = 3000;




const verifyToken =  (req, res , next) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(404).json({message : "Token not found , Invalid User"})
    }

    try {
        const verify =  jwt.verify(token , process.env.secretKey);
        req.user = verify;
        next();
    } catch (error) {
   return res.status(500).json({message : "Error Found"});
    }
}
app.use(express.json());
app.use("/" , router);


app.get("/" , (req,res ) =>{
    res.send("This is my Frist Try");

    
})

app.get("/Profile" , verifyToken , (req, res) => {
        res.send(`Welcome ${req.user.username}!`)
    })
app.listen(PORT , () =>{
    console.log (`Backend running in the port:http://localhost:${PORT}`)
})