const mongoose  = require('mongoose');

const trainschema = mongoose.Schema({
    "trainName" :{ 
        type:String,
        required:true,
    },
    "trainNumber": {
        type:String,
        required:true,
    },
    "departureTime" : {
        "Hours" : Number,
        "Minutes" : Number,
        "Seconds" : Number
        
    },


    "seatsAvailable" : {
        "sleeper" : Number,
        "AC" : Number,
    },
    "price":{
        "sleeper": Number,
        "AC" : Number
    },

    "delayedBy" : Number,
})

const trains = mongoose.model("trains" , trainschema);
module.exports = trains;