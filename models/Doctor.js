const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  age: Number,
  photo: String,
  sex: String,
  phone: String,
  speciality: String,
  patients: [{
      id: String
  }],
  acheivements: []
});

const Doctor = mongoose.model('Doctor', UserSchema);

module.exports = Doctor;
