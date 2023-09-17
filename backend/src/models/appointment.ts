import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const baseOptions = {  
    collection: 'appointments'
};

let AppointmentSchema = new Schema({
    type: {
        type: ObjectId
    },
    doctor: {
        type: ObjectId
    },
    patient: {
        type: ObjectId
    },
    date: {
        type: Date
    },
    duration: {
        type: Number
    },
    report: {
        date : {
            type: Date
        },
        reason: {
            type: String
        },
        diagnosis: {
            type: String
        },
        therapy: {
            type: String
        },
        nextAppointment: {
            type: Date
        },
        default: {}
    },
    valid: {
        type: Boolean,
        default: true
    }
},
    baseOptions
)

const Appointment =  mongoose.model('Appointment', AppointmentSchema);

module.exports = {Appointment}