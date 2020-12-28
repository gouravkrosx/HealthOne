const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: String,
    doctorId: String,
    prescription: {
        date: Date,
        text: String
    },
    pFlag: Number,
    dFlag: Number,
    date: Date,
    time: String,
    description: String
});

const Appointment = mongoose.model('appointment', appointmentSchema);

module.exports = Appointment;