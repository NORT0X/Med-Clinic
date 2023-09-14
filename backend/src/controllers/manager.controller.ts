import express from 'express';
var ObjectId = require('mongodb').ObjectID;

const { User, Doctor, Patient } = require('../models/user')
const { BannedUser } = require('../models/bannedUser')

export class ManagerController {
    // Get all patients and doctors
    getAllNotVerifiedUsers = async (req: express.Request, res: express.Response) => {
        try {
            console.log('get all users')
            const users = await User.find({userType: { $in: ['Doctor', 'Patient'] }, verified: false}).exec();
            return res.status(200).json({"users": users});
        } catch(error) {
            return res.status(500).json({ error: 'Failed to get users' });
        }
    }

    getAllVerifiedUsers = async (req: express.Request, res: express.Response) => {
        try {
            console.log('get all users')
            const users = await User.find({userType: { $in: ['Doctor', 'Patient'] }, verified: true}).exec();
            return res.status(200).json({"users": users});
        } catch(error) {
            return res.status(500).json({ error: 'Failed to get users' });
        }
    }

    verifyUser = async (req: express.Request, res: express.Response) => {
        try {
            console.log('verify user')
            console.log(req.body)
            let user = req.body;
            console.log(user.username)
            const result = await User.findOneAndUpdate({ username: user.username }, { verified: true }).exec();

            if (result.nModified === 0) {
                return res.status(400).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: 'User verified' });
        } catch(error) {
            return res.status(500).json({ error: 'Failed to verify user' });
        }
    }

    editUser = async (req: express.Request, res: express.Response) => {
        try {
            let user = req.body;
            console.log(user)

            let result;
            if (user.userType === 'Doctor') {
                result = await Doctor.findOneAndUpdate({"_id": new ObjectId(user._id)}, user).exec();
            } else if (user.userType === 'Patient') {
                result = await Patient.findOneAndUpdate({"_id": new ObjectId(user._id)}, user).exec();
            }

            if(!result)
            {
                return res.status(400).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: 'User edited' });
        } catch(error) {
            return res.status(500).json({ error: 'Failed to edit user' });
        }
    }

    blockUser = async (req: express.Request, res: express.Response) => {
        try {
            let user = req.body;
            console.log(user)

            const bannedUser = new BannedUser(user);

            await User.deleteOne({"username": user.username, "email": user.email}).exec();

            bannedUser.save();
            res.status(200).json({ message: 'User blocked' });
        } catch(error) {
            return res.status(500).json({ error: 'Failed to block user' });
        }
    }

    deleteUser = async (req: express.Request, res: express.Response) => {
        try {
            let user = req.body;
            console.log(user)

            await User.deleteOne({"username": user.username, "email": user.email}).exec();

            res.status(200).json({ message: 'User deleted' });
        } catch(error) {
            return res.status(500).json({ error: 'Failed to delete user' });
        }
    }
}