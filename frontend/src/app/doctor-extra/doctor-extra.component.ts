import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { DoctorService } from '../services/doctor.service';
import { AppType } from '../model/appType';
import { UserService } from '../services/user.service';
import { NonWorkingDay } from '../model/nonWorkingDay';

@Component({
  selector: 'app-doctor-extra',
  templateUrl: './doctor-extra.component.html',
  styleUrls: ['./doctor-extra.component.css']
})
export class DoctorExtraComponent implements OnInit {

  constructor(private userService: UserService,private doctorService: DoctorService) { }

  currentUser: User;

  appointmentTypeToAdd: AppType = new AppType();
  appointmentMessage: string;

  isDurationVisible: boolean = false;

  // Not working dates;
  startDate: Date;
  endDate: Date;

  notWorkingDaysMessage: string;

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('user'));
  }

  async addAppointmentType() {
    try {
      const result = await this.doctorService.createAppointmentType(this.currentUser.specialization, this.appointmentTypeToAdd);
      this.appointmentMessage = result['message'];
      window.location.reload();
    } catch (error: any) {
      this.appointmentMessage = error.error.error;
      console.log(error.error.error);
    }
  }

  async setNonWorkingDays() {
    try {
      let nonWorkingDay= new NonWorkingDay();
      let currentDate = new Date();
      nonWorkingDay.startDate = this.startDate;
      nonWorkingDay.endDate = this.endDate;
      nonWorkingDay.user = this.currentUser._id;
      if (this.startDate == null || this.endDate == null) {
        this.notWorkingDaysMessage = "You must fill both dates!"
        return;
      }
      if (new Date(this.startDate) > new Date(this.endDate)) {
        this.notWorkingDaysMessage = "Start date must be before end date!"
        return;
      }
      if (new Date(this.startDate) <= currentDate) {
        this.notWorkingDaysMessage = "Start date must be after current date!"
        return;
      }
      console.log(typeof this.startDate)
      const result = await this.userService.setNonWorkingDays(nonWorkingDay)
      this.notWorkingDaysMessage = "Success!"
    } catch (error: any) {
      console.log(error.error.error);
    }
  }

}
