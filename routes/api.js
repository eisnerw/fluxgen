//////////////////////////////////////////////
// API
//////////////////////////////////////////////
var express    = require('express');
var router     = express.Router();
var ObjectId   = require('mongodb').ObjectId;
var emitters   = require('../emitters');

//////////////////////////////////////////////
// Middle-ware
//////////////////////////////////////////////

router.use(function timeLog(req, res, next) {
  console.log('API call. Time: ', Date.now());
  next();
});

//////////////////////////////////////////////
// Sample Model
//////////////////////////////////////////////

var Widget = require('../models/widget.js');
var widgetRoutes = require('./modelAPI')(Widget);

router.use(widgetRoutes);

module.exports = router;