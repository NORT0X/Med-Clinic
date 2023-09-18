import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Appointment } from '../model/appointment';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor(private userService: UserService) { }

  async ngOnInit() {
    try {
      let appId = window.location.href.split('/')[4];
      console.log(appId)
      let res = await this.userService.getAppointmentById(appId);
      this.appointment = res['appointment'];
      console.log(this.appointment)
      this.currentUser = this.userService.getUserFromStorage();
      if (this.currentUser._id == this.appointment.patient || this.currentUser._id == this.appointment.doctor) {
        this.isVisible = true;
      }

      if(this.appointment.report == undefined) {
        this.isVisible = false;
      }
      res = await this.userService.getUserById(this.appointment.doctor);
      this.doctor = res['user'];
    } catch(error) {
      console.log(error.error.error)
    }
  }

  isVisible: boolean = false;
  currentUser: User;
  appointment: Appointment;
  doctor: User;

  getDoctorName() {
    return this.doctor.firstname + " " + this.doctor.lastname;
  }

  isThereNextAppointment() {
    if (this.appointment.report.nextAppointment) {
      return true;
    }
    return false;
  }

  getDateTimeString(date) {
    console.log(typeof date)
    return this.userService.getDateTimeString(new Date(date));
  }

  downloadReport() {
    this.userService.downloadReportForAppointment(this.appointment);
  }
}
