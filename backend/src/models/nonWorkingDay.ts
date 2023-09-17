import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let NonWorkingDaySchema = new Schema({
    user: {
        type: String
    },
    reason: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }
})

const NonWorkingDay =  mongoose.model('NonWorkingDay', NonWorkingDaySchema, 'nonWorkingDays');

module.exports = {NonWorkingDay}