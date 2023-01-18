var express = require('express');
var router = express.Router();


/* POST users listing. */
router.post('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
  res.header("Access-Control-Allow-Credentials", 'true');
  res.cookie('token',{httpOnly: true, maxAge: 0});
  res.send({success: true, error: false, message: "Logout Successful!", data: null});
});

module.exports = router;