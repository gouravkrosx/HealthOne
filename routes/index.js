const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//--- Models of db
const PUser = require('../models/Patient');
const DUser = require('../models/Doctor');


//Homepage
router.get('/', (req, res) => (
  res.render("homepage")
))

// Register/Login Page
router.get('/welcome', forwardAuthenticated, (req, res) => res.render('welcome'));
router.get('/users/Patient', (req, res) => res.render('Patient'));
router.get('/users/Doctor', (req, res) => res.render('Doctor'));




//Dashboard 

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  if(Object.getPrototypeOf(req.user)===PUser.prototype){  
    res.render('dashboard', {
        user: req.user
    })
  }
  else{
    res.render('dashboard', {user: req.user});
  }
});


module.exports = router;
