import mongoose from 'mongoose';
import DoctorSchema from './doctor';
import PatientSchema from './patient';

const Schema = mongoose.Schema;

const baseOptions = {  
    discriminatorKey: 'userType',
    collection: 'users'
};

let UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    picturePath: { 
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }},
    baseOptions
)

const User =  mongoose.model('User', UserSchema);
const Doctor = User.discriminator('Doctor', DoctorSchema)
const Patient = User.discriminator('Patient', PatientSchema)

module.exports = {User, Doctor, Patient}
