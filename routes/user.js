var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const dbConn = require('../dbConn');
const dotenv = require('dotenv');
dotenv.config();
const {ObjectId} = require('mongodb');

const findUserById = async (collection,userId)=>{
  const User = await collection.find({_id: ObjectId(userId)}).toArray();
  return User[0]
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
  res.header("Access-Control-Allow-Credentials", 'true');
  const cookie = req.cookies['token'];

  try{
    const claims = jwt.verify(cookie,process.env.SECRET);
    if(!claims)res.status(401).json({success: false, error: true, message: "No Auth!", data: null})
    const user = await findUserById(dbConn.Coll, claims._id);
    const {password,...userMinusPassword} = user ;
    res.json({success: true, error: false, message: "Authorized Please Proceed!", data: userMinusPassword});
  }catch(error){
    res.status(500).json({success: false, error: true, message: "jwt Error", data: null})
  }

});

module.exports = router;