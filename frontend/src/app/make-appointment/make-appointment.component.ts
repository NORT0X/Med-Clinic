import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Appointment } from '../model/appointment';
import { DoctorService } from '../services/doctor.service';
import { AppType } from '../model/appType';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.css']
})
export class MakeAppointmentComponent implements OnInit {

  @Input() doctorForAppointment: User;

  constructor(private patientService: PatientService, private userService: UserService, private doctorService: DoctorService) { }

  async ngOnInit() {
    try {
      this.currentUser = this.userService.getUserFromStorage();
      let res = await this.doctorService.getAppointmentTypesForSpecialization(this.doctorForAppointment.specialization);
      this.appointmentTypes = res['appointmentTypes'];
      console.log(this.appointmentTypes);
      console.log(this.doctorForAppointment);
      console.log(this.currentUser)
    } catch (error) {
      console.log(error.error.error)
    }
  }

  appointmentTypes: AppType[];
  
  appointment: Appointment = new Appointment();
  currentUser: User;
  appMessage;
  priceForAppointment;
  isAppointmentTypeSelected: boolean = false;

  async makeAppointment() {
    this.appointment.patient = this.currentUser._id;
    this.appointment.doctor = this.doctorForAppointment._id;
    if (this.appointment.date == undefined == undefined || this.appointment.type == undefined) {
      this.appMessage = "Please fill all fields";
      return;
    }

    const currentDate = new Date();
    if (new Date(this.appointment.date) < currentDate) {
      this.appMessage = "Date must be in the future";
      return;
    }

    console.log(this.appointment)
    try {
      const result = await this.patientService.makeAppointment(this.appointment);
      this.appMessage = result['message'];
    } catch (error) {
      console.log(error.error.error)
      this.appMessage = error.error.error;
    }
  }

  getPriceForAppointment() {
    this.priceForAppointment = this.appointmentTypes.find(x => x._id == this.appointment.type).price;
    return this.priceForAppointment;
  }
}
