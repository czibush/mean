'use strict';

// server.js
// BASE SETUP
// =============================================================================

// call the packages we need

var http = require('http');
var MongoClient = require('mongodb').MongoClient
var URL = 'mongodb://localhost:27017/company'
var express = require('express');        // call express
var bodyParser = require('body-parser');
var app = express();                 // define our app using express
var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/company'); // connect to our database

//Load models
var Company = require('./app/models/company');



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app/public')); //Ez kell a fasza kis angularhoz MAAAGGGIIIC :D




// routes ======================================================================
require('./app/routes.js')(app);

app.listen(port);
console.log('Magic happens on port ' + port);
