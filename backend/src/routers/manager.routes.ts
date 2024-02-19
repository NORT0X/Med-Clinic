import express from "express";
import { ManagerController } from "../controllers/manager.controller";
import { authenticate, managerAuth } from "../middleware/auth"

const managerRouter = express.Router();

managerRouter.route('/getAllVerifiedUsers').get(
    authenticate,
    managerAuth,
    (req, res) => new ManagerController().getAllVerifiedUsers(req, res)
)

managerRouter.route('/getAllNotVerifiedUsers').get(
    authenticate,
    managerAuth,
    (req, res) => new ManagerController().getAllNotVerifiedUsers(req, res)
)


managerRouter.route('/verifyUser').post(
    authenticate,
    managerAuth,
    (req, res) => new ManagerController().verifyUser(req, res)
)

managerRouter.route('/editUser').post(
    authenticate,
    managerAuth,
    (req, res) => new ManagerController().editUser(req, res)
)

managerRouter.route('/blockUser').post(
    authenticate,
    managerAuth,
    (req, res) => new ManagerController().blockUser(req, res)
)

managerRouter.route('/deleteUser').post(
    authenticate,
    managerAuth,
    (req, res) => new ManagerController().deleteUser(req, res)
)

managerRouter.route('/addSpecialization').post(
    authenticate,
    managerAuth,
    (req, res) => new ManagerController().addSpecialization(req, res)
)

managerRouter.route('/getSpecializations').get(
    (req, res) => new ManagerController().getSpecializations(req, res)
)

export default managerRouter;
