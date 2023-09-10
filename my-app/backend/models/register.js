const mongoose = require('mongoose');


const registerSchema = mongoose.Schema({
    companyName:{
        type:String,
        required:true,
    },
    ownerName:{
        type:String,
        required:true
    },

    rollNo:{
        type:String,
        required:true

    },


    ownerEmail:{
        type:String,
        required:true,
        
    },

    accessCode:{
        type:String,
        required:true,
    },

    clientId:{
        type:String,
        required:false,
    },
    clientSecret:{
        type:String,
        required:false,
    }
})

const user = mongoose.model("user",registerSchema);
module.exports = user;