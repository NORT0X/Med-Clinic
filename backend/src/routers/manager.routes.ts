import express from "express";
import { ManagerController } from "../controllers/manager.controller";

const managerRouter = express.Router();

managerRouter.route('/getAllVerifiedUsers').get(
    (req, res) => new ManagerController().getAllVerifiedUsers(req, res)
)

managerRouter.route('/getAllNotVerifiedUsers').get(
    (req, res) => new ManagerController().getAllNotVerifiedUsers(req, res)
)


managerRouter.route('/verifyUser').post(
    (req, res) => new ManagerController().verifyUser(req, res)
)

managerRouter.route('/editUser').post(
    (req, res) => new ManagerController().editUser(req, res)
)

managerRouter.route('/blockUser').post(
    (req, res) => new ManagerController().blockUser(req, res)
)

managerRouter.route('/deleteUser').post(
    (req, res) => new ManagerController().deleteUser(req, res)
)

export default managerRouter;