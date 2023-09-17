import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:4000';

  makeAppointment(appointment) {
    return this.http.post(`${this.url}/appointment/makeAppointment`, appointment).toPromise();
  }

  getPatientAppointments(id) {
    return this.http.get(`${this.url}/appointment/getAppointmentsForPatient/${id}`).toPromise();
  }

  deleteAppointment(appointment) {
    return this.http.post(`${this.url}/appointment/deleteAppointment`, appointment).toPromise();
  }

  getPatientAppointmentsForSpecialization(patientId, specializationId) {
    return this.http.get(`${this.url}/appointment/getPatientAppointmentsForSpecialization/${patientId}/${specializationId}`).toPromise();
  }
}
