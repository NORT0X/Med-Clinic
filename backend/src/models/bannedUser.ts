import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let BannedUserScehma = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    }
})

const BannedUser =  mongoose.model('BannedUser', BannedUserScehma, 'bannedUsers');

module.exports = {BannedUser}