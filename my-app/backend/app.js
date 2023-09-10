const express = require("express");
const app = express();
const cors = require("cors");
const connectdb = require("./db");
const  {protect} = require('./middlewares/authMiddleware')
app.use(express.json());
const register = require('./routes/register');
const trains = require('./routes/trains');
app.use(cors());
const port = 5000;


connectdb();


app.use('/train/trains',protect, trains);
app.use('/train' , register);

app.use("/", (req, res) => {
  res.send("server is up and running");
});



app.listen(port, () => {
  console.log(`listening on port : ${port}`);
});
