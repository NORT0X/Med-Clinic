import express from 'express';
import * as jwt from 'jsonwebtoken';

var ObjectId = require('mongodb').ObjectID;

const { User, Doctor, Patient } = require('../models/user')
const { BannedUser } = require('../models/bannedUser')
const { NonWorkingDay } = require('../models/nonWorkingDay')

export class UserController {
    register = async (req: express.Request, res: express.Response) => {
        try {
            let user = JSON.parse(req.body.user);

            // Check if user with the same username or email exists
            let check = await User.findOne({ username: user.username }).exec();
            if(check) {
                return res.status(400).json({ error: 'User with the same username already exists!'})
            }
            check = await User.findOne({ email: user.email }).exec()
            if(check) {
                return res.status(400).json({ error: 'User with the same email already exists!'})
            }

            // Check if user with the same username or email is banned
            check = await BannedUser.findOne({ username: user.username }).exec()
            if(check) {
                return res.status(400).json({ error: 'User with the same username is banned!'})
            }
            check = await BannedUser.findOne({ email: user.email }).exec()
            if(check) {
                return res.status(400).json({ error: 'User with the same email is banned!'})
            }
            if (req.body.hasImage === 'true') {
                const url = req.protocol + '://'+ req.get('host');
                // const imagePath = path.join(__dirname, '../../uploads/images');
                user.picturePath = url + '/uploads/images/';
                user.picturePath += req.body.imageName;
            } else {
                const url = req.protocol + '://'+ req.get('host');
                user.picturePath = url + '/uploads/images/face.png';
            }
            if(user.userType === 'Patient') {
                user = new Patient(user)
            } else if (user.userType === 'Doctor') {
                console.log(user)
                user = new Doctor(user)
            } else {
                return res.status(400).json({ error: 'Invalid type!' });
            }

            await user.save();
            return res.status(201).json(user);
        } catch(error) {
            return res.status(500).json({ error: 'Failed to create user' });
        }
    }

    login = async (req: express.Request, res: express.Response) => {
        try {
            let { username, password } = req.body
            
            let user = await User.findOne({ username: username, password: password }).exec();
            console.log(user)
            
            if (user.verified === false) {
                return res.status(400).json({ error: 'User not verified' });
            }

            const token = jwt.sign(user.toJSON(), "YOUR_SECRET", {
                expiresIn: 604800,
            });

            console.log('Token login: ' + token);

            return res.status(200).json(
                {
                    user,
                    token
                })
        } catch(error) {
            return res.status(500).json({ error: "User doesn't exist" })
        }
    }

    changePassword = async (req: express.Request, res: express.Response) => {
        try {
            let user = req.body;
            console.log(user)

            const result = await User.findOneAndUpdate({"_id": user._id}, user).exec();
            res.status(200).json({ message: 'Password changed' });
        } catch(error) {
            res.status(500).json({ error: 'Failed to change password' })
        }
    }

    changeProfilePicture = async (req: express.Request, res: express.Response) => {
        let user = JSON.parse(req.body.user);
        let path;
        const url = req.protocol + '://'+ req.get('host');
        // const imagePath = path.join(__dirname, '../../uploads/images');
        path = url + '/uploads/images/';
        path += req.body.imageName;
        try {
            const result = await User.findOneAndUpdate({ username: user.username }, { picturePath: path }).exec()
            res.status(200).json({ message: 'Profile picture changed' });
        } catch(error) {
            return res.status(500).json({ error: 'Failed to change profile picture' })
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

    getUserById = async (req: express.Request, res: express.Response) => {
        try {
            let id = req.params.id;
            let user = await User.findOne({"_id": new ObjectId(id)}).exec();
            if(!user)
            {
                return res.status(400).json({ message: 'User not found' });
            }
            return res.status(200).json({ user: user });
        } catch(error) {
            return res.status(500).json({ error: 'Failed to get user' });
        }
    }

    getAllDoctors = async (req: express.Request, res: express.Response) => {
        try {
            console.log('test')
            const doctors = await User.find({userType: 'Doctor', verified: true}).exec();
            return res.status(200).json({"doctors": doctors});
        } catch(error) {
            return res.status(500).json({ error: 'Failed to get doctors' });
        }
    }

    getAllPatients = async (req: express.Request, res: express.Response) => {
        try {
            const patients = await User.find({userType: 'Patient', verified: true}).exec();
            return res.status(200).json({"patients": patients});
        } catch(error) {
            return res.status(500).json({ error: 'Failed to get patients' });
        }
    }

    setNonWorkingDays = async (req, res: express.Response) => {
        try {
            if (req.user.userType != 'Doctor') {
                return res.status(403).json({ error: 'You must be a doctor!'})
            }

            let nonWorkingDays = req.body;
            console.log(nonWorkingDays)
            const result = await NonWorkingDay.create(nonWorkingDays);
            return res.status(200).json({ message: 'Non working days set' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to set non working days' });
        }
    }

}