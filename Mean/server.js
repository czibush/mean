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

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/company'); // connect to our database

//Load models

var Company = require('./app/models/company');



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router

//------------------------------------------------------------- COMPANY MODELL -------------------------------------------------------------
router.route('/company')

    //--------------------------------------------------- Összes company lekérdezése -------------------------------------------------------
    .get(function (req, res) {
        Company.find(function (err, company) {
            if (err)
                res.send(err);

            res.json(company);
        })
    })

    //------------------------------------------------------ Új company hozzáadása --------------------------------------------------------
    .post(function (req, res) {
        var company = new Company();      // create a new instance of the Company model
        company.name = req.body.name;
        company.address = req.body.address;

        // save the Company and check for errors
        company.save(function (err) {
            if (err)
                res.send(err);

            res.json({
                message: 'Company created: ' + req.body.name
            });
        });

    });

router.route('/company/:company_id')
    //----------------------------------------------------- Csak egy elemet lekérni ------------------------------------------------------
    .get(function (req, res) {
        Company.findById(req.params.company_id, function (err, company) {
            if (err)
                res.send(err);
            res.json(company);
        });
    })

    //-------------------------------------------------------- Company Módosítása --------------------------------------------------------
    .put(function (req, res) {

        Company.findById(req.params.company_id, function (err, company) {
            if (err)
                res.send(err);

            company.name = req.body.name;  // update the info
            company.address = req.body.address;

            // save the company
            company.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Company updated!' });
            });
        });
    })

    //---------------------------------------------------------- Company Törlése --------------------------------------------------------
    .delete(function (req, res) {
        Company.remove({
            _id: req.params.company_id
        }, function (err, company) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


//ha ide beírom h /api - akkor a routok a localhost/api/.. -on lesz elérhetõ
app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
