'use strict';

var express = require('express');
var router = express.Router();

// GET the movies articles
router.get('/', function(req, res) {
  res.render('movies');
});

// GET october best article
router.get('/best_october_2017', function(req, res) {
  res.render('best_october_2017');
});

module.exports = router;
