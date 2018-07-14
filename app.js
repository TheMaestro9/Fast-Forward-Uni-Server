/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
const express = require('express');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
const cfenv = require('cfenv');

// create a new express server
const app = express();


const assert = require('assert');
const util = require('util')

const mysql = require('mysql');






// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
const appEnv = cfenv.getAppEnv();

const services = appEnv.services;

const cors = require('cors');

const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


var port = process.env.PORT || 6001;

const vrVideoRouter = require('./routers/vr-videos')
const universitiesRouter = require('./routers/universities')
const userRounter = require("./routers/user")
app.use("/vr-videos", vrVideoRouter)
app.use("/universities",universitiesRouter) 
app.use("/user" , userRounter)





app.get("/hello", function(request,response){

  var verify = require("./controllers/verify") ;
  var token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNTI5MzM3MjQ0LCJleHAiOjE1Mjk0MjcyNDR9.bIqTq5luvjGysmajXlUIUvvQh2UwRbNR3DNHd0xRoik"

  const jwt = require("jsonwebtoken");
  const secretKey = "1234-5678-0987-6543"


  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
        console.log("error")
        var err = new Error('You are not authenticated!');
        err.status = 401;
        return next(err);
    } else {
        // if everything is good, save to request for use in other routes
        // req.userId = decoded.id;
        console.log('hello')
        console.log(decoded)
        response.send(decoded)

    }
});
  
});




app.get("/query", function (request, response) {

  // execute a query on our database
  var qstring = request.query.q;
  // console.log(qstring);
  db = require("./db")
  db.query(qstring, function (err, result) {
    if (err) {
      console.log(err);
      if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {

        db.connect(function (err) {
          if (err) {
            console.log(err);
          }
        });

      }
      response.status(500).send(err);
    } else {
      response.send(result);
    }

  });
});

  app.get("*" , function (req , res){
    console.log("CANNOT GETTTT")
    console.log(req)
    res.send("eh da ya man enta a7wal wla eh")
  })


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  err.success = false
  res.status(err.status || 500);
  res.json({
    "error": err.message,
    "success": err.success
  });
});



app.listen(port) 


function onListening() {
  var addr = app.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

//module.exports = app;
