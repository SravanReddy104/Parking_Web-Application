import data from "./dbData.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 9000;
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const url =
  "mongodb+srv://Sravan47:ip2HdOUbp5PbIB9b@cluster0.m92mbv0.mongodb.net/Parking?retryWrites=true&w=majority";
// mongodb+srv://Sravan10:aSMOoPpCQwXcag46@cluster0.hldwt.mongodb.net/sravan?retryWrites=true&w=majority
mongoose.connect(url);

const db = mongoose.connection;
db.once("open", () => {
  console.log("connected");
  const parkingData = db.collection("ParkingData");
});
const parkingData = db.collection("ParkingData");
app.post("/sendData", (req, res) => {
  console.log("in Post");
  const pMessage = req.body;

  data.create(pMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/messages", (req, res) => {
  data.find((err, data) => {
    console.log("response", data);
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.get("/count",async (req,res)=>{
  var value;
await data.countDocuments().then((resss)=>res.send(JSON.stringify(resss)));

 
 
 })
  
app.post("/delete", (req, res) => {
  console.log("hello");
  const vechileNo1 = req.body;
  console.log("in delete");

  data.deleteOne(vechileNo1, function (err, res) {
    if (err) {
      console.log(err);
    }
    console.log("1 document updated");
  });
});
app.post("/update",(req,res)=>{
  console.log("update");
  const vechileNo1 = req.body;
  data.updateOne({vechileNo:vechileNo1["vechileNo"]},{$set:{checkOut:vechileNo1["checkOut"]}},function(err,res){
    if(err){
      console.log(err);
    }
    else{
      console.log("updated");
    }
    
   
  })
  console.log("v",vechileNo1["vechileNo"])
})

app.listen(port, () => console.log(`Listening at ${port}`));
