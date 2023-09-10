const asyncHandler = require('express-async-handler');



const registerSchema = require('../models/register');
const { v4: uuidv4 } = require('uuid');
var seed = require('random-bytes-seed')
var randomBytes = seed('a seed')

const gettoken = require("../generatetoken");

const register = async (req,res) => {
    console.log(req);
    const {companyName , ownerName , rollNo,ownerEmail,accessCode} = req.body;
    
    if(!companyName  || !ownerName || !rollNo || !ownerEmail || !accessCode) {
        return res.status(400).json("Please Enter all the Fields");
      

    }

    const UserExists = await registerSchema.findOne({ ownerEmail , companyName});

    if(UserExists) {
        return res.status(400).json("User already exists");
        

    }

    const clientId = uuidv4();
    const clientSecret = randomBytes(10).toString('hex');


    const company = await registerSchema.create({
        companyName , ownerName , rollNo,ownerEmail,accessCode,clientId,clientSecret
    });


    if(company) {
        res.status(201).json({
            companyName : company.companyName,
            clientId:clientId,
            clientSecret:clientSecret,
        })
    }

    
}


// for login 
const authUser = asyncHandler(async (req, res) => {
    const {companyName , ownerName , rollNo,ownerEmail,clientId,clientSecret } = req.body;
  
    const user = await registerSchema.findOne({ownerEmail, clientId,ownerName,rollNo,clientSecret});
  
    if (user) {
      res.json({
        "token_type":"Bearer",
        "access_token": gettoken(clientId),
        "expires_in" :30* 24 * 60 *60*100,
      });
    } else {
      res.status(401).json("Invalid Email or Password");
    }
  });
module.exports = {register,authUser};

