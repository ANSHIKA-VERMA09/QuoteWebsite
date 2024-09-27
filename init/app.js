const mongoose = require('mongoose');
const initdata =require("./data.js");
const QUOTES=require("../models/quote.js");


mongoose.connect("mongodb://localhost:27017/quotehub")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB", err));


 const initDB=async ()=>{
    await QUOTES.deleteMany({});
    await QUOTES.insertMany(initdata.data);
    console.log("data has been inserted");
 } 

 initDB();