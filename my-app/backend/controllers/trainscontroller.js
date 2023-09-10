
const trains_model = require("../models/trains")
const listTrains = async (req,res) => { 
    const details = await trains_model.find();
    
    res.status(200).json(details);

}


const getTrainByName = async (req , res) =>{ 
    const trainNumber = req.params.trainNumber;
  const train_details =   await trains_model.findOne({trainNumber : trainNumber.toString()});
  if(!train_details) {
    return res.status(404).json("train not found!");
  } 
  res.status(200).json(train_details);
}

module.exports = {listTrains,getTrainByName};