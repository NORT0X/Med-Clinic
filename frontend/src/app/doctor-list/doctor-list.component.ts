import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  constructor(private userService: UserService, private doctorService: DoctorService) { }

  doctors = [];
  currentUser;
  firstNumberOfDoctors = 0;

  searchFirstname: string = "";
  searchLastname: string = "";
  searchSpecialization: string = "";

  async ngOnInit() {
    try {
      const result = await this.userService.getAllDoctors()
      this.doctors = result['doctors'];
      this.firstNumberOfDoctors = this.doctors.length;
      console.log(this.doctors);
      this.currentUser = this.userService.getUserFromStorage();
      console.log(this.currentUser)
    } catch (error: any) {
      console.log(error.error.error);
    }
  }

  seeProfile(doctor) {
    window.location.href = '/user/' + doctor._id;
  }

  async searchDoctor() {
    try {
      if (this.doctors.length < this.firstNumberOfDoctors) {
        const result = await this.userService.getAllDoctors()
        this.doctors = result['doctors'];
      }
      this.doctors = this.doctorService.searchDoctor(this.doctors, this.searchFirstname, this.searchLastname, this.searchSpecialization);
    } catch (error: any) {
      console.log(error.error.error);
    }
  }

  sortDoctorsByFirstname() {
    this.doctors = this.doctorService.sortDoctorsByFirstname(this.doctors);
  }

  sortDoctorsByLastname() {
    this.doctors = this.doctorService.sortDoctorsByLastname(this.doctors);
  }

  sortDoctorsBySpecialization() {
    this.doctors = this.doctorService.sortDoctorsBySpecialization(this.doctors);
  }

  sortDoctorsByBranch() {
    this.doctors = this.doctorService.sortDoctorsByBranch(this.doctors);
  }
}
