const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './routes/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
 
var upload = multer({ storage: storage });

// Load User model
const DUser = require('../models/Doctor');
const PUser = require('../models/Patient');

const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/Patient/login', forwardAuthenticated, (req, res) => res.render('loginPatient'));
router.get('/Doctor/login', forwardAuthenticated, (req, res) => res.render('loginDoctor'));

// Register Page
router.get('/Patient/register', forwardAuthenticated, (req, res) => res.render('RegisterforPatient'));
router.get('/Doctor/register', forwardAuthenticated, (req, res) => res.render('RegisterforDoctor'));

// Register
//-----------doc-----------
router.post('/Doctor/register', upload.single('photo'), (req, res) => {
  console.log(req.file);
  const { name, address, dateOfBirth, medicalSchool, yearsOfPractice, language, clinicAddress, clinicTiming, speciality, phone, sex, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 || !address || !language || !dateOfBirth ||!speciality || !clinicAddress || !clinicTiming || !medicalSchool || !yearsOfPractice || !phone || !sex) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('RegisterforDoctor', {
      errors,
      name,
      address, 
      dateOfBirth,
      medicalSchool,
      yearsOfPractice,
      clinicAddress,
      clinicTiming,
      language,
      speciality, 
      phone, 
      sex, 
      email, 
      password, 
      password2
    });
  } else {
    DUser.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('RegisterforDoctor', {
          errors,
          name,
          address, 
          dateOfBirth,
          medicalSchool,
          yearsOfPractice,
          clinicTiming,
          clinicAddress,
          language,
          speciality, 
          phone, 
          sex, 
          email, 
          password, 
          password2
        });
      } else {
        const newUser = new DUser({
          name,
          address, 
          dateOfBirth: new Date(dateOfBirth),
          medicalSchool,
          yearsOfPractice,
          clinicAddress,
          clinicTiming,
          language,
          photo: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: req.file.mimetype
          },
          speciality, 
          phone, 
          sex, 
          email, 
          password, 
          
        });
        //<img src="data:image/<%=image.img.contentType%>;base64,
        //<%=image.img.data.toString('base64')%>">
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            
            
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/Doctor/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

//----------------patient--------------------
router.post('/Patient/register', upload.single('photo'), (req, res) => {
  console.log(req.file);
  const { name, address, dateOfBirth, password, sex, email, phone, password2,  emergencyName, emergencyPhone, emergencyAddress} = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 || !address || !dateOfBirth || !sex || !phone || !emergencyName || !emergencyPhone || !emergencyAddress) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('RegisterforPatient', {
      errors,
      name,
      address,
      dateOfBirth,
      emergencyAddress,
      emergencyName,
      emergencyPhone,
      password,
      
      sex, 
      email, 
      phone,
      password2
    });
  } else {
    PUser.findOne({ email: email }).then(user => {
      if (user) {
        console.log(user);
        errors.push({ msg: 'Email already exists' });
        res.render('RegisterforPatient', {
          errors,
          name,
          address,
          dateOfBirth,
          emergencyPhone,
          emergencyName,
          emergencyAddress,
          password,
          sex, 
          email, 
          phone,
          password2
        });
      } else {
        const newUser = new PUser({
          name,
          address,
          dateOfBirth: new Date(dateOfBirth),
          password,
          emergencyContacts:{
            name: emergencyName,
            phone: emergencyPhone,
            address: emergencyAddress
          },
          photo: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: req.file.mimetype
          },
          sex, 
          email, 
          phone,
          
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                
                console.log(newUser);
                res.redirect('/users/Patient/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});




// Login
//----------------patient-------------
router.post('/Patient/login', (req, res, next) => {
  passport.authenticate('local-P', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/Patient/login',
    failureFlash: true
  })(req, res, next);
});




//-----------------doctor-----------------
router.post('/Doctor/login', (req, res, next) => {
  passport.authenticate('local-D', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/Doctor/login',
    failureFlash: true
  })(req, res, next);
});


// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;
