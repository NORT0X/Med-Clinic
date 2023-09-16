import express from "express";
import { AppointmentController } from "../controllers/appointment.controller";

const appointmentRouter = express.Router();

appointmentRouter.route('/getAllAppointmentTypesForSpecialization').post(
    (req, res) => new AppointmentController().getAllAppointmentTypesForSpecialization(req, res)
)

appointmentRouter.route('/createAppointmentType').post(
    (req, res) => new AppointmentController().createAppointmentType(req, res)
)

appointmentRouter.route('/validateAppointment').post(
    (req, res) => new AppointmentController().validateAppointment(req, res)
)

appointmentRouter.route('/validateAppointmentType').post(
    (req, res) => new AppointmentController().validateAppointmentType(req, res)
)

appointmentRouter.route('/getAllAppointmentTypes').get(
    (req, res) => new AppointmentController().getAllAppointmentTypes(req, res)
)

appointmentRouter.route('/editAppointmentType').post(
    (req, res) => new AppointmentController().editAppointmentType(req, res)
)

appointmentRouter.route('/deleteAppointmentType').post(
    (req, res) => new AppointmentController().deleteAppointmentType(req, res)
)

appointmentRouter.route('/makeAppointment').post(
    (req, res) => new AppointmentController().makeAppointment(req, res)
)

appointmentRouter.route('/getAppointmentsForPatient/:id').get(
    (req, res) => new AppointmentController().getAllAppointmentsForPatient(req, res)
)

appointmentRouter.route('/getAppointmentsForDoctor/:id').get(
    (req, res) => new AppointmentController().getAllAppointmentsForDoctor(req, res)
)

appointmentRouter.route('/deleteAppointment').post(
    (req, res) => new AppointmentController().deleteAppointment(req, res)
)


export default appointmentRouter;