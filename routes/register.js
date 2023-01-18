var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const dbConn = require('../dbConn');

const registerUser = async (collection,user)=>{
    const register = await collection.insertOne(user);
    const index = await collection.createIndex({username:1},{unique: true});
    return register
}

/* POST users listing. */
router.post('/', async function(req, res, next) {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
  if(!req.body.username){
    res.status(500).json({success: false, error: true, message: "Missing Username", data: req.body});
    return
  }
  if(!req.body.password){
    res.status(500).json({success: false, error: true, message: "Missing Password", data: req.body});
    return
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: hashedPassword
  }

  try{
    const newRegister = await registerUser(dbConn.Coll, newUser);
    res.json({success: true, error: false, message: "Successful Registration!", data: newRegister});
  }catch(error){
    res.status(500).json({success: false, error: true, message: "Error with db register", data: req.body});
  }

});




module.exports = router;