const express = require("express");
const router = express.Router();

const cors = require("cors");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();


router.use(cors());
router.use(bodyParser.json());



const user = [];

router.post("/signUp" , async (req , res) => {
    try {
        const {username , password} = req.body;
        const hashPassword = await bcrypt.hash(password , 10) ;
        user.push({username, password : hashPassword}) 
        console.log(user);

        res.status(201).json({message : "User Created Successfully"});
    }
    catch(error) {
        res.status(404).json({mesasge : "Error found"})
    }
}) 


router.post("/login" , async (req,res) => {
    try {
        const {username , password} = req.body;
       

        const signUpuser = await user.find(us =>  us.username.toLowerCase().trim() === username.toLowerCase().trim())
        if(! signUpuser) {
            return res.status(404).json({message : " User not matched"})
        }

           const validPassword = await bcrypt.compare(password , signUpuser.password);

           if ( ! validPassword) {
            return res.status(404).json({mesasge : "Password dosn't matches"})
           }

           const token = jwt.sign (
            {username : signUpuser.username} ,
                process.env.secretKey, 
                {expiresIn: "1hr"}
           )

           res.json({token});
          

    } catch(error) {
res.status(500).json({message : "Error Found"});
    }
})

module.exports = router;