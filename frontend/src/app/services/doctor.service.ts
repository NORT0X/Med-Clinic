import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient, private userService: UserService) { }

  searchDoctor(doctors, firstName, lastName, specialization) {
    return doctors.filter(
      doctor => doctor.firstname.toLowerCase().includes(firstName.toLowerCase())
      && doctor.lastname.toLowerCase().includes(lastName.toLowerCase())
      && doctor.specialization.toLowerCase().includes(specialization.toLowerCase())
    );
  }

  sortDoctorsByFirstname(doctors) {
    return doctors.sort((a, b) => {
      if (a.firstname < b.firstname) {
        return -1;
      }
      if (a.firstname > b.firstname) {
        return 1;
      }
      return 0;
    });
  }

  sortDoctorsByLastname(doctors) {
    return doctors.sort((a, b) => {
      if (a.lastname < b.lastname) {
        return -1;
      }
      if (a.lastname > b.lastname) {
        return 1;
      }
      return 0;
    });
  }

  sortDoctorsBySpecialization(doctors) {
    return doctors.sort((a, b) => {
      if (a.specialization < b.specialization) {
        return -1;
      }
      if (a.specialization > b.specialization) {
        return 1;
      }
      return 0;
    });
  }

  sortDoctorsByBranch(doctors) {
    return doctors.sort((a, b) => {
      if (a.branch < b.branch) {
        return -1;
      }
      if (a.branch > b.branch) {
        return 1;
      }
      return 0;
    });
  }

  getAppointmentTypesForSpecialization(specialization) {
    return this.http.post(`${this.userService.url}/appointment/getAllAppointmentTypesForSpecialization`, { specialization: specialization }).toPromise();
  }

  getAllAppointmentTypes() {
    console.log('test')
    return this.http.get(`${this.userService.url}/appointment/getAllAppointmentTypes`).toPromise();
  }

  createAppointmentType(specialization, app) {
    let appointmentType = {
      specialization: specialization,
      type: app.type,
      price: app.price
    }
    return this.http.post(`${this.userService.url}/appointment/createAppointmentType`, appointmentType).toPromise();
  }

  validateAppointmentType(appointment) {
    return this.http.post(`${this.userService.url}/appointment/validateAppointmentType`, appointment).toPromise();
  }

  editAppointmentType(appointment) {
    return this.http.post(`${this.userService.url}/appointment/editAppointmentType`, appointment).toPromise();
  }

  deleteAppointmentType(appointment) {
    return this.http.post(`${this.userService.url}/appointment/deleteAppointmentType`, appointment).toPromise();
  }

  getDoctorAppointments(id) {
    return this.http.get(`${this.userService.url}/appointment/getAppointmentsForDoctor/${id}`).toPromise();
  }

  writeAppointmentReport(appointment) {
    return this.http.post(`${this.userService.url}/appointment/editAppointment`, appointment).toPromise();
  }
}
