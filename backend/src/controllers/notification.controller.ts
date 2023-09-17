import express from 'express';
var ObjectId = require('mongodb').ObjectID;

const { User, Doctor, Patient } = require('../models/user')
const { BannedUser } = require('../models/bannedUser')
const { Specialization } = require('../models/specialization')
const { Notification } = require('../models/notification')

export class NotificationController {
    getAllNotificationsForUser = async (req: express.Request, res: express.Response) => {
        try {
            const notifications = await Notification.find({user: req.params.id}).exec();
            return res.status(200).json({"notifications": notifications});
        } catch(error) {
            return res.status(500).json({ error: 'Failed to get notifications' });
        }
    }

    sendNotification = async (req: express.Request, res: express.Response) => {
        try {
            let notification = req.body;
            const result = await Notification.create(notification);
            return res.status(200).json({ message: 'Notification sent' });
        } catch(error) {
            return res.status(500).json({ error: 'Failed to send notification' });
        }
    }

    seeNotification = async (req: express.Request, res: express.Response) => {
        try {
            let notification = req.body;
            const result = await Notification.findOneAndUpdate({"_id": new ObjectId(notification._id)}, {seen: true}).exec();
            return res.status(200).json({ message: 'Notification seen' });
        } catch(error) {
            return res.status(500).json({ error: 'Failed to see notification' });
        }   
    }
}