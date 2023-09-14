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
    sepcialization: {
        type: String
    },
    branch: {
        type: String
    }
})

export default DoctorSchema