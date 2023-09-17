import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let NotificationSchema = new Schema({
    description: {
        type: String
    },
    user: {
        type: String
    },
    date: {
        type: Date
    },
    seen: {
        type: Boolean,
        default: false
    }
})

const Notification =  mongoose.model('Notification', NotificationSchema, 'notifications');

module.exports = {Notification}