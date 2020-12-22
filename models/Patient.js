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
  sex: String,
  phone: String,
  illness: String,
  prescriptions: [{
      date: Date,
      doctorName: String,
      text: String
  }]
});

const Patient = mongoose.model('Patient', UserSchema);

module.exports = Patient;
