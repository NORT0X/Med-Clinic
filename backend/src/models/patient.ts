import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const options = {  discriminatorKey: 'userType' };

let PatientSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    }
})

export default PatientSchema