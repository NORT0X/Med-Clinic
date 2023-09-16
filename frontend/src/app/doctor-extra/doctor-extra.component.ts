import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { DoctorService } from '../services/doctor.service';
import { AppType } from '../model/appType';

@Component({
  selector: 'app-doctor-extra',
  templateUrl: './doctor-extra.component.html',
  styleUrls: ['./doctor-extra.component.css']
})
export class DoctorExtraComponent implements OnInit {

  constructor(private doctorService: DoctorService) { }

  currentUser: User;

  appointmentTypeToAdd: AppType = new AppType();
  appointmentMessage: string;

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

}
