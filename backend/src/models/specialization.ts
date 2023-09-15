import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const baseOptions = {  
    collection: 'specializations'
};

let SpecializationSchema = new Schema({
    specialization: {
        type: String
    }},
    baseOptions
)

const Specialization =  mongoose.model('Specialization', SpecializationSchema);

module.exports = {Specialization}