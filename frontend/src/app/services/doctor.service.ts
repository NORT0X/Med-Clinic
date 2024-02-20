import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })

    return this.http.post(`${this.userService.url}/appointment/createAppointmentType`, appointmentType, { headers }).toPromise();
  }

  validateAppointmentType(appointment) {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.post(`${this.userService.url}/appointment/validateAppointmentType`, appointment, { headers }).toPromise();
  }

  editAppointmentType(appointment) {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.post(`${this.userService.url}/appointment/editAppointmentType`, appointment, { headers }).toPromise();
  }

  deleteAppointmentType(appointment) {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.post(`${this.userService.url}/appointment/deleteAppointmentType`, appointment, { headers }).toPromise();
  }

  addAppointmentTypeToDoctor(doctor, app) {
    let appointmentType = {
      doctor: doctor,
      appointmentType: app
    }
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.post(`${this.userService.url}/appointment/addAppointmentTypeToDoctor`, appointmentType, { headers }).toPromise();
  }

  removeAppointmentTypeFromDoctor(doctor, app) {
    let appointmentType = {
      doctor: doctor,
      appointmentType: app
    }
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.post(`${this.userService.url}/appointment/removeAppointmentTypeFromDoctor`, appointmentType, { headers }).toPromise();
  }

  getDoctorAppointments(id) {
    return this.http.get(`${this.userService.url}/appointment/getAppointmentsForDoctor/${id}`).toPromise();
  }

  writeAppointmentReport(appointment) {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
   return this.http.post(`${this.userService.url}/appointment/editAppointment`, appointment, { headers }).toPromise();
  }

  getAppointmetTypesForDoctor(id) {
    return this.http.get(`${this.userService.url}/appointment/getAppointmentTypesForDoctor/${id}`).toPromise();
  }

  sendQrCodeToPatient(appointment) {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.post(`${this.userService.url}/appointment/sendQrCodeToEmail`, appointment, { headers }).toPromise();
  }
}
