import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const options = {  discriminatorKey: 'userType' };

let DoctorSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    licenseID: {
        type: Number
    },
    specialization: {
        type: String
    },
    branch: {
        type: String
    },
    appointmentTypes: {
        type: Array,
        default: []
    },
})

export default DoctorSchema