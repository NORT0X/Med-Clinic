import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Appointment } from '../model/appointment';
import { PatientService } from '../services/patient.service';
import { AppType } from '../model/appType';
import { DoctorService } from '../services/doctor.service';
import { Report } from '../model/report';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../model/notification';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  constructor(private userService: UserService,
    private patientService: PatientService, 
    private doctorService: DoctorService,
    private notificationService: NotificationService
    ) { }

  async ngOnInit() {
    try {
      this.currentUser = this.userService.getUserFromStorage();
      let result;
      if (this.currentUser.userType == "Patient") {
        result = await this.patientService.getPatientAppointments(this.currentUser._id);
      } else if (this.currentUser.userType == "Doctor") {
        result = await this.doctorService.getDoctorAppointments(this.currentUser._id);
      }
      this.appointments = result['appointments'];
      this.appointments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.appointemtsToHappen = this.appointments.filter(x => new Date(x.date) > new Date());

      result = await this.doctorService.getAllAppointmentTypes();
      this.appTypes = result['appointmentTypes'];

      result = await this.userService.getAllDoctors();
      this.allDoctors = result['doctors'];

      result = await this.userService.getAllPatients();
      this.allPatients = result['patients'];

      console.log(this.appointments)
      console.log(this.currentDate)
    } catch (error) {
      console.log(error.error.error)
    }
  }

  appointments: Appointment[] = [];
  appointemtsToHappen: Appointment[] = [];
  allDoctors: User[] = [];
  allPatients: User[] = [];
  appTypes: AppType[] = [];

  currentUser: User;

  currentDate = new Date();

  displayStyle = "none";

  displayStyle2 = "none";

  displayStyle3 = "none";

  report: Report = new Report();

  nextAppointmentChecked: boolean = false;

  selectedAppointment: Appointment;
  selectedPatient: User;
  appointmentsForPatient: Appointment[] = [];

  cancelDescription: string = "";

  async deleteAppointment(appointment) {
    try {
      const result = await this.patientService.deleteAppointment(appointment);
      console.log(result)
      window.location.reload();
    } catch (error) {
      console.log(error.error.error)
    }
  }

  async cancelAppointment(appointment) {
    console.log(appointment)
    try {
      let result = await this.patientService.deleteAppointment(this.selectedAppointment);
      console.log(result)
      let notification = new Notification();
      notification.date = new Date();
      notification.user = this.selectedPatient._id
      notification.description = "Your appointment with " + this.getDoctorName(this.selectedAppointment.doctor) + " on " + this.getDateAndTimeString(notification.date) + " has been canceled. Reason: " + this.cancelDescription;
      result = await this.notificationService.sendNotification(notification)
      window.location.reload();
    } catch (error) {
      console.log(error.error.error)
    }
  }

  enableAppEdit(appointment) {
    this.selectedAppointment = appointment;
    this.selectedPatient = this.allPatients.find(x => x._id == appointment.patient);
    this.displayStyle = "block"
  }

  disableAppEdit(appointment) {
    this.selectedAppointment = null;
    appointment.isEditEnabled = false;
    this.displayStyle = "none"
  }

  getPatientName(id) {
    for (let i = 0; i < this.allPatients.length; i++) {
      if (this.allPatients[i]._id == id) {
        return this.allPatients[i].firstname + " " + this.allPatients[i].lastname;
      }
    }
    return ""
  }

  getDoctorName(id) {
    for (let i = 0; i < this.allDoctors.length; i++) {
      if (this.allDoctors[i]._id == id) {
        return this.allDoctors[i].firstname + " " + this.allDoctors[i].lastname;
      }
    }
    return ""
  }

  getAppointmentType(id) {
    for (let i = 0; i < this.appTypes.length; i++) {
      if (this.appTypes[i]._id == id) {
        return this.appTypes[i].type;
      }
    }
    return ""
  }

  getBranch(id) {
    for (let i = 0; i < this.allDoctors.length; i++) {
      if (this.allDoctors[i]._id == id) {
        return this.allDoctors[i].branch;
      }
    }
    return ""
  }

  getDate(date) {
    return new Date(date);
  }

  enableWriting(appointment) {
    console.log(appointment)
    this.selectedAppointment = appointment;
    this.displayStyle2 = "block"
  }

  disableWriting(appointment) {
    this.selectedAppointment = null;
    this.displayStyle2 = "none"
  }

  writeReport(appointment) {

    this.report.date = new Date();
    this.selectedAppointment.report = this.report;
    this.displayStyle2 = "none"
    this.doctorService.writeAppointmentReport(this.selectedAppointment);

    let notification = new Notification();
    notification.user = this.selectedAppointment.patient;
    notification.date = new Date();
    let appDate = new Date(this.selectedAppointment.date);
    notification.description = "Your appointment with " + this.getDoctorName(this.selectedAppointment.doctor) + " on " + this.getDateAndTimeString(appDate) + " has been reviewed. You can download the report from link: http://localhost:4200/review/" + this.selectedAppointment._id;
    this.notificationService.sendNotification(notification);
    window.location.reload();
  }

  isReportNone(appointment) {
    if (appointment.report == null) {
      return false;
    }
    return true;
  }

  compareDates(date1, date2) {
    return new Date(date1) < new Date(date2);
  }

  getDateAndTimeString(date) {
    return this.userService.getDateTimeString(new Date(date));
  }

  async showRecord(appointment) {
    this.selectedAppointment = appointment;
    this.selectedPatient = this.allPatients.find(x => x._id == appointment.patient);
    
    try {
      let result = await this.patientService.getPatientAppointments(this.selectedPatient._id);
      this.appointmentsForPatient = result['appointments'];
      this.appointmentsForPatient.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch (error) {
      console.log(error.error.error)
    }

    this.displayStyle3 = "block";
  }

  hideRecord() {
    this.selectedAppointment = null;
    this.selectedPatient = null;
    this.displayStyle3 = "none";
  }


}
