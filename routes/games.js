'use strict';

var express = require('express');
var router = express.Router();

// GET games articles
router.get('/', function(req, res) {
  res.render('games');
});

// GET horror_games articles
router.get('/horror_games', function(req, res) {
  res.render('horror_games');
});

// GET upcoming_games_2017
router.get('/upcoming_games_2017', function(req, res) {
  res.render('upcoming_games_2017');
});

//GET upcoming_owg_2017
router.get('/upcoming_owg_2017', function(req, res) {
  res.render('upcoming_owg_2017');
});

module.exports = router;
