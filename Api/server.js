const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookiePasrser = require('cookie-parser')
const cors = require("cors");

const authRoute = require("../Api/Rotues/auth")
const cafeRoute = require("../Api/Rotues/cafe")
const menuRoute = require("../Api/Rotues/menu")

dotenv.config();

app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB COnnection Succesful"));
  }


app.use(express.json())
app.use(cookiePasrser())

app.use("/auth" , authRoute)
app.use("/cafe" , cafeRoute)
app.use("/menu" , menuRoute)

app.listen( 6969 , ()=>{
    console.log( "Backend Server is Running" );
})