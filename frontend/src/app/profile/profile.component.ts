import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { DoctorService } from '../services/doctor.service';
import { ManagerService } from '../services/manager.service';
import { AppType } from '../model/appType';

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
      this.user = this.userService.getUserFromStorage();
      this.getSpecializations();
      if (this.user.userType === 'Doctor') {
        this.getAppointmentTypes();
      }
  }

  user: User;
  image;
  isEditEnabled = false;

  // Special for doctor
  appointmentTypesToSelect: AppType[] = [];
  doctorAppointmentTypes: AppType[] = [];
  appointmentTypeToAdd: string;

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
      result = await this.doctorService.getAppointmentTypesForSpecialization(this.user.specialization);
      this.appointmentTypesToSelect = result['appointmentTypes'];
      this.appointmentTypesToSelect = this.appointmentTypesToSelect.filter( appType => !this.user.appointmentTypes.includes(appType._id));
    
      result = await this.doctorService.getAppointmentTypesForSpecialization(this.user.specialization);
      this.doctorAppointmentTypes = result['appointmentTypes'];
      console.log(this.doctorAppointmentTypes);
      console.log(this.user.appointmentTypes)
      this.doctorAppointmentTypes = this.doctorAppointmentTypes.filter( appType => this.user.appointmentTypes.includes(appType._id));
    } catch (error: any) {
      console.log(error);
    }
  }

  async removeAppTypeFromDoctor(appTypeId) {
    try {
      let result = await this.doctorService.removeAppointmentTypeFromDoctor(this.user._id, appTypeId);
      console.log(result);
      result  = await this.userService.login(this.user.username, this.user.password);
      sessionStorage.setItem('user', JSON.stringify(result['user']));
      sessionStorage.setItem('token', result['token']);
      window.location.reload();
    } catch(error) {
      console.log(error.error.error);
    }
  }

  async addAppTypeToDoctor() {
    try {
      console.log(this.appointmentTypeToAdd)
      let result = await this.doctorService.addAppointmentTypeToDoctor(this.user._id, this.appointmentTypeToAdd);
      console.log(result);
      result  = await this.userService.login(this.user.username, this.user.password);
      sessionStorage.setItem('user', JSON.stringify(result['user']));
      sessionStorage.setItem('token', result['token']);
      window.location.reload();
    } catch(error) {
      console.log(error.error.error);
    }
  }


}
