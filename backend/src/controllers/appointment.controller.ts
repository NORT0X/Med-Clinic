import express from 'express';
var ObjectId = require('mongodb').ObjectID;

const { User, Doctor, Patient } = require('../models/user')
const { BannedUser } = require('../models/bannedUser')
const { Specialization } = require('../models/specialization')
const { AppointmentType } = require('../models/appointmentTypes')
const { Appointment } = require('../models/appointment')
const { NonWorkingDay } = require('../models/nonWorkingDay')

var pdf = require("pdf-creator-node");
var fs = require("fs");
var QRCode = require('qrcode')
var nodeMailer = require('nodemailer');

var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Review</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};

export class AppointmentController {

    sendQrCodeToEmail = async (req: express.Request, res: express.Response) => {
        try {
            console.log('send qr code to email')
            console.log(req.body)
            let appointment = req.body;
            let url = `http://localhost:4200/review/${appointment._id}`;
            let patient = await Patient.findOne({"_id": new ObjectId(appointment.patient)}).exec();
            let doctor = await Doctor.findOne({"_id": new ObjectId(appointment.doctor)}).exec();
            let appointmentType = await AppointmentType.findOne({"_id": new ObjectId(appointment.appointmentType)}).exec();

            let qrCode = await QRCode.toDataURL(url);
            console.log(qrCode)

            let transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'aleksa.pia01@gmail.com',
                    pass: 'ifek zeob wdao pmeo'
                }
            });

            let mailOptions = {
                from: 'aleksa.pia01@gmail.com',
                to: patient.email,
                subject: 'Appointment QR Code',
                text: 'Here is your appointment QR Code',
                attachments: [{
                    filename: 'qrCode.png',
                    path: qrCode
                }]
            };

            transporter.sendMail(mailOptions, function(error: any, info: any){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            })
        } catch(error) {
            console.log(error)
        }
    }

     async generatePdf(appointment: any) {
        try {
            console.log('generate pdf')
            console.log(appointment)
            let patient = await Patient.findOne({"_id": new ObjectId(appointment.patient)}).exec();
            let doctor = await Doctor.findOne({"_id": new ObjectId(appointment.doctor)}).exec();
            console.log('doctor')
            console.log(doctor)
            let appointmentType = await AppointmentType.findOne({"_id": new ObjectId(appointment.appointmentType)}).exec();

            let html = fs.readFileSync("src/controllers/review.html", "utf8");
            let nextApp;
            if (appointment.nextAppointment) {
                nextApp = new Date(appointment.nextAppointment).toDateString();
            } else {
                nextApp = 'None';
            }

            let review = {
                date: new Date(appointment.date).toDateString(),
                doctor: doctor.firstname + ' ' + doctor.lastname,
                doctorSpec: doctor.specialization,
                reason: appointment.report.reason,
                diagnosis: appointment.report.diagnosis,
                therapy: appointment.report.therapy,
                nextAppointment: nextApp,
            }
            
            let document = {
                html: html,
                data: {
                    review: review
                },
                path: `./uploads/pdf/${appointment._id}.pdf`
            };
            pdf.create(document, options)
                .then((res: any) => {
                    console.log(res);
                })
                .catch((error: any) => {
                    console.error(error);
                });
        } catch(error) {
            console.log(error)
        }
    }

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

    addAppointmentTypeToDoctor = async (req: express.Request, res: express.Response) => {
        try {
            let doctor = req.body.doctor;
            console.log('add appointment type to doctor')
            let appointmentType = req.body.appointmentType;
            console.log(doctor)
            console.log(appointmentType)

            let result = await Doctor.findOneAndUpdate({"_id": new ObjectId(doctor)}, {$push: {appointmentTypes: appointmentType}}).exec();

            if(!result)
            {
                return res.status(400).json({ message: 'Doctor not found' });
            }
            return res.status(200).json({ message: 'Appointment type added to doctor' });
        } catch(error) {
            return res.status(500).json({ error: 'Failed to add appointment type to doctor' });
        }
    }

    removeAppointmentTypeFromDoctor = async (req: express.Request, res: express.Response) => {
        try {
            let doctor = req.body.doctor;
            let appointmentType = req.body.appointmentType;
            console.log(doctor)
            console.log(appointmentType)

            let result = await Doctor.findOneAndUpdate({"_id": new ObjectId(doctor)}, {$pull: {appointmentTypes: appointmentType}}).exec();

            if(!result)
            {
                return res.status(400).json({ message: 'Doctor not found' });
            }
            return res.status(200).json({ message: 'Appointment type deleted from doctor' });
        } catch(error) {
            return res.status(500).json({ error: 'Failed to delete appointment type from doctor' });
        }
    }

    makeAppointment = async (req: express.Request, res: express.Response) => {
        try {
            console.log('make appointment')

            // Check if date and time are valid
            // Check if doctor is free
            let appointmentsOfDoctor = await Appointment.find({doctor: req.body.doctor}).exec();
            let overlapping = false;
            appointmentsOfDoctor.forEach(appointment => {
                const end1 = new Date(appointment.date.getTime() + appointment.duration * 60000);
                const end2 = new Date(new Date(req.body.date).getTime() + req.body.duration * 60000);

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

            // Check if doctor is working
            let doctor = await Doctor.findOne({"_id": new ObjectId(req.body.doctor)}).exec();

            let nonWorkingDays = await NonWorkingDay.find({user: doctor._id}).exec();
            console.log(nonWorkingDays)
            nonWorkingDays.forEach(nonWorkingDay => {
                console.log(typeof nonWorkingDay.startDate)
                const startDate = new Date(nonWorkingDay.startDate);
                const endDate = new Date(nonWorkingDay.endDate);
                // have to increment endDate by 1 day because it is not included in the range
                endDate.setDate(endDate.getDate() + 1);

                const date = new Date(req.body.date);
                if (startDate.getTime() <= date.getTime() && date.getTime() <= endDate.getTime()) {
                    overlapping = true;
                }
            })

            if(overlapping) {
                return res.status(400).json({ error: 'Doctor is not working' });
            }

            const appointment = new Appointment(req.body);
            const result = await appointment.save();


            return res.status(200).json({"message": "Appointment created"});

        } catch(error) {
            return res.status(500).json({ error: 'Failed to make appointment' });
        }
    }

    getAppointmentById = async (req: express.Request, res: express.Response) => {
        try {
            let id = req.params.id;
            console.log(id)
            const appointment = await Appointment.findOne({"_id": new ObjectId(id)}).exec();
            return res.status(200).json({"appointment": appointment});
        } catch(error) {
            return res.status(500).json({ error: 'Failed to get appointment' });
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

    editAppointment = async (req: express.Request, res: express.Response) => {
        try {
            let appointment = req.body;
            console.log(appointment)

            let result = Appointment.findOneAndUpdate({"_id": new ObjectId(appointment._id)}, appointment).exec();
            this.generatePdf(appointment);

            if(!result)
            {
                return res.status(400).json({ message: 'Appointment not found' });
            }
            return res.status(200).json({ message: 'Appointment edited' });
        } catch(error) {
            return res.status(500).json({ error: 'Failed to edit appointment' });
        }
    }

    getPatientAppointmentsForSpecialization = async (req: express.Request, res: express.Response) => {
        try {
            let patientId = req.params.patientId;
            let specializationId = req.params.specializationId;
            console.log(patientId)
            console.log(specializationId)
            const appointments = await Appointment.find({patient: patientId}).exec();
            let appointmentsForSpecialization = [];
            appointments.forEach(appointment => {
                if (appointment.specialization == specializationId) {
                    appointmentsForSpecialization.push(appointment);
                }
            })
            return res.status(200).json({"appointments": appointmentsForSpecialization});
        } catch(error) {
            return res.status(500).json({ error: 'Failed to get appointments' });
        }
    }
}