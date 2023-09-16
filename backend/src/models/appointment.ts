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
    valid: {
        type: Boolean,
        default: true
    }
},
    baseOptions
)

const Appointment =  mongoose.model('Appointment', AppointmentSchema);

module.exports = {Appointment}