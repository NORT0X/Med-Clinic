import express from 'express';
var ObjectId = require('mongodb').ObjectID;

const { User, Doctor, Patient } = require('../models/user')
const { BannedUser } = require('../models/bannedUser')
const { Specialization } = require('../models/specialization')
const { AppointmentType } = require('../models/appointmentTypes')
const { Appointment } = require('../models/appointment')

export class AppointmentController {
    getAllAppointmentTypesForSpecialization = async (req: express.Request, res: express.Response) => {
        try {
            console.log('get all appointment types for specialization')
            console.log(req.body)
            const appointmentTypes = await AppointmentType.find({specialization: req.body.specialization}).exec();
            return res.status(200).json({"appointmentTypes": appointmentTypes});
        } catch(error) {
            return res.status(500).json({ error: 'Failed to get appointment types' });
        }
    }

    createAppointmentType = async (req: express.Request, res: express.Response) => {
        try {
            console.log('create appointment type')
            console.log(req.body)
            const appointmentType = new AppointmentType(req.body);
            const result = await appointmentType.save();
            return res.status(200).json({"message": "Appointment type created"});
        } catch(error) {
            return res.status(500).json({ error: 'Failed to create appointment type' });
        }
    }

    validateAppointment = async (req: express.Request, res: express.Response) => {
        try {
            console.log('validate appointment')
            console.log(req.body)
            const appointment = await Appointment.findOneAndUpdate({"_id": new ObjectId(req.body._id)}, {valid: true}).exec();
            return res.status(200).json({"appointment": appointment});
        } catch(error) {
            return res.status(500).json({ error: 'Failed to validate appointment' });
        }
    }

    validateAppointmentType = async (req: express.Request, res: express.Response) => {
        try {
            console.log('validate appointment type')
            console.log(req.body)
            const appointmentType = await AppointmentType.findOneAndUpdate({"_id": new ObjectId(req.body._id)}, {valid: true}).exec();
            return res.status(200).json({"appointmentType": appointmentType});
        } catch(error) {
            return res.status(500).json({ error: 'Failed to validate appointment type' });
        }
    }

    getAllAppointmentTypes = async (req: express.Request, res: express.Response) => {
        try {
            console.log('get all appointment types')
            const appointmentTypes = await AppointmentType.find({}).exec();
            return res.status(200).json({"appointmentTypes": appointmentTypes});
        } catch(error) {
            return res.status(500).json({ error: 'Failed to get appointment types' });
        }
    }

    editAppointmentType = async (req: express.Request, res: express.Response) => {
        try {
            let appointmentType = req.body;
            console.log(appointmentType)

            let result = AppointmentType.findOneAndUpdate({"_id": new ObjectId(appointmentType._id)}, appointmentType).exec();

            if(!result)
            {
                return res.status(400).json({ message: 'Appointment type not found' });
            }
            return res.status(200).json({ message: 'Appointment type edited' });
        } catch(error) {
            return res.status(500).json({ error: 'Failed to edit appointment type' });
        }
    }

    deleteAppointmentType = async (req: express.Request, res: express.Response) => {
        try {
            let appointmentType = req.body;
            console.log(appointmentType)

            let result = AppointmentType.deleteOne({"_id": new ObjectId(appointmentType._id)}).exec();

            if(!result)
            {
                return res.status(400).json({ message: 'Appointment type not found' });
            }
            return res.status(200).json({ message: 'Appointment type deleted' });
        } catch(error) {
            return res.status(500).json({ error: 'Failed to delete appointment type' });
        }
    }

    makeAppointment = async (req: express.Request, res: express.Response) => {
        try {
            console.log('make appointment')
            console.log(req.body)
            // Check if date and time are valid
            // Check if doctor is free
            let appointmentsOfDoctor = await Appointment.find({doctor: req.body.doctor}).exec();
            console.log(appointmentsOfDoctor)
            let overlapping = false;
            appointmentsOfDoctor.forEach(appointment => {
                console.log(typeof req.body.date)
                const end1 = new Date(appointment.date.getTime() + appointment.duration * 60000);
                const end2 = new Date(new Date(req.body.date).getTime() + req.body.duration * 60000);
                console.log('test')
                // check if appointment overlaps with req.body.date
                if (appointment.date.getTime() <= end2.getTime() && new Date(req.body.date).getTime() <= end1.getTime()) {
                    overlapping = true;
                }
            })

            if(overlapping) {
                return res.status(400).json({ error: 'Doctor is not free' });
            }
            // Check if patient is free
            let appointmentsOfPatient = await Appointment.find({patient: req.body.patient}).exec();
            console.log(appointmentsOfPatient)

            appointmentsOfPatient.forEach(appointment => {
                const end1 = new Date(appointment.date.getTime() + appointment.duration * 60000);
                const end2 = new Date(new Date(req.body.date).getTime() + req.body.duration * 60000);

                // check if appointment overlaps with req.body.date
                if (appointment.date.getTime() <= end2.getTime() && new Date(req.body.date).getTime() <= end1.getTime()) {
                    overlapping = true;
                }
            })

            if(overlapping) {
                return res.status(400).json({ error: 'Patient is not free' });
            }
            const appointment = new Appointment(req.body);
            const result = await appointment.save();
            return res.status(200).json({"message": "Appointment created"});

        } catch(error) {
            return res.status(500).json({ error: 'Failed to make appointment' });
        }
    }

    getAllAppointmentsForPatient = async (req: express.Request, res: express.Response) => {
        try {
            let id = req.params.id;
            console.log(id)
            const appointments = await Appointment.find({patient: id}).exec();
            return res.status(200).json({"appointments": appointments});
        } catch(error) {
            return res.status(500).json({ error: 'Failed to get appointments' });
        }
    }

    getAllAppointmentsForDoctor = async (req: express.Request, res: express.Response) => {
        try {
            let id = req.params.id;
            console.log(id)
            const appointments = await Appointment.find({doctor: id}).exec();
            return res.status(200).json({"appointments": appointments});
        } catch(error) {
            return res.status(500).json({ error: 'Failed to get appointments' });
        }
    }

    deleteAppointment = async (req: express.Request, res: express.Response) => {
        try {
            let appointment = req.body;
            console.log(appointment)

            let result = Appointment.deleteOne({"_id": new ObjectId(appointment._id)}).exec();

            if(!result)
            {
                return res.status(400).json({ message: 'Appointment not found' });
            }
            return res.status(200).json({ message: 'Appointment deleted' });
        } catch(error) {
            return res.status(500).json({ error: 'Failed to delete appointment' });
        }
    }
}