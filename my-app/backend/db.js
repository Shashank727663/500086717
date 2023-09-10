const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://shashankkrishu99:HmwEjENeHIMosb2g@cluster0.gkcbfxv.mongodb.net/",
      {
        useUnifiedTopology: true
      }
    );

    console.log(`db connection established.... ${conn.connection.host}`);
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};

module.exports = connectdb;
