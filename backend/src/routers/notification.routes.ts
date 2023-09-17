import express from "express";
import { NotificationController } from "../controllers/notification.controller";

const notificationRouter = express.Router();

notificationRouter.route('/getAllNotificationsForUser/:id').get(
    (req, res) => new NotificationController().getAllNotificationsForUser(req, res)
)

notificationRouter.route('/sendNotification').post(
    (req, res) => new NotificationController().sendNotification(req, res)
)

notificationRouter.route('/seeNotification').post(
    (req, res) => new NotificationController().seeNotification(req, res)
)

export default notificationRouter;