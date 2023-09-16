import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Appointment } from '../model/appointment';
import { PatientService } from '../services/patient.service';
import { AppType } from '../model/appType';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  constructor(private userService: UserService, private patientService: PatientService, private doctorService: DoctorService) { }

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

      result = await this.doctorService.getAllAppointmentTypes();
      this.appTypes = result['appointmentTypes'];

      result = await this.userService.getAllDoctors();
      this.allDoctors = result['doctors'];

      result = await this.userService.getAllPatients();
      this.allPatients = result['patients'];

      console.log(this.appointments)
    } catch (error) {
      console.log(error.error.error)
    }
  }

  appointments: Appointment[] = [];
  allDoctors: User[] = [];
  allPatients: User[] = [];
  appTypes: AppType[] = [];

  currentUser: User;

  displayStyle = "none";

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
  }

  enableAppEdit(appointment) {
    appointment.isEditEnabled = true;
    this.displayStyle = "block"
  }

  disableAppEdit(appointment) {
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
}
