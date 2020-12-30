const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: String,
    patientName: String,
    patientPhoto:{
        data: Buffer,
        contentType: String
    },
    doctorId: String,
    doctorName: String,
    doctorSpeciality: String,
    clinicAddress: String,
    doctorPhoto: {
        data: Buffer,
        contentType: String
    },
    prescription: {
        date: Date,
        text: String
    },
    pFlag: Number,
    dFlag: Number,
    date: Date,
    time: {
        start: Date,
        end: Date 
    },
    description: String
});

const Appointment = mongoose.model('appointment', appointmentSchema);

module.exports = Appointment;