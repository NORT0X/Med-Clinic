import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const baseOptions = {  
    collection: 'appointmentTypes'
};

let AppointmentTypeSchema = new Schema({
    type: {
        type: String
    },
    specialization: {
        type: String
    },
    price: {
        type: Number
    },
    duration: {
        type: Number,
        default: 30
    },
    valid: {
        type: Boolean,
        default: false
    }
},
    baseOptions
)

const AppointmentType =  mongoose.model('AppointmentType', AppointmentTypeSchema);

module.exports = {AppointmentType}