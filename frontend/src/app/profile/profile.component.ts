import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { DoctorService } from '../services/doctor.service';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService,
    private doctorService: DoctorService,
    private managerService: ManagerService
  ) { }

  async ngOnInit() {
    try {
      this.user = this.userService.getUserFromStorage();
      this.getSpecializations();
      if (this.user.userType === 'Doctor') {
        await this.getAppointmentTypes();
      }
    } catch (error: any) {
      console.log(error.error.error); 
    }
  }

  user: User;
  image;
  isEditEnabled = false;

  // Special for doctor
  appointmentTypes = [];

  allSpecializations;

  async getSpecializations() {
    try {
      const result = await this.managerService.getSpecializations();
      this.allSpecializations = result['specializations'];
      console.log(this.allSpecializations);
    } catch (error: any) {
      console.log(error.error.error);
    }
  }

  fileChange(event) {
    this.image = event.target.files[0];
  }

  async changeImage() {
    let formData = new FormData();
    formData.append('user', JSON.stringify(this.user));
    formData.append('image', this.image);
    formData.append('imageName', this.image.name);

    try {
      let result = await this.userService.changeImage(formData);
      console.log(result);

      result  = await this.userService.login(this.user.username, this.user.password);
      sessionStorage.setItem('user', JSON.stringify(result['user']));
      sessionStorage.setItem('token', result['token']);

      window.location.reload();
    } catch (error: any) {
      console.log(error.error.error);
    }
  }

  enableEdit() {
    this.isEditEnabled = true;
  }

  disableEdit() {
    this.isEditEnabled = false;
  }

  async editUser() {
    try {
      let result = await this.userService.editUser(this.user);
      console.log(result);

      result  = await this.userService.login(this.user.username, this.user.password);
      sessionStorage.setItem('user', JSON.stringify(result['user']));
      sessionStorage.setItem('token', result['token']);

      window.location.reload();
    } catch (error: any) {
      console.log(error.error.error);
    }
  }

  async getAppointmentTypes() {
    try {
      let result = await this.doctorService.getAppointmentTypesForSpecialization(this.user.specialization);
      console.log(result);
      this.appointmentTypes = result['appointmentTypes'];
    } catch (error: any) {
      console.log(error.error.error);
    }
  }


}
