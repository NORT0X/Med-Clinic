import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:4000';

  register(formData: FormData): Promise<any> {
    return this.http.post(`${this.url}/users/register`, formData).toPromise();
  }

  login(username, password) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.url}/users/login`, data).toPromise();
  }

  getPatient(): Observable<any> {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.get(`${this.url}/users/patient`, { headers: headers });
  }

  getUserFromStorage(): User {
    let user = sessionStorage.getItem('user');
    return JSON.parse(user);
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');

    // window.location.reload();
  }

  changePassword(user) {
    return this.http.post(`${this.url}/users/changePassword`, user).toPromise();
  }

  changeImage(formData: FormData) {
    return this.http.post(`${this.url}/users/changeImage`, formData).toPromise();
  }

  editUser(user) {
    return this.http.post(`${this.url}/users/editUser`, user).toPromise();
  }

  getUserById(id) {
    return this.http.get(`${this.url}/users/${id}`).toPromise();
  }

  getAllDoctors() {
    return this.http.get(`${this.url}/users/getAllDoctors`).toPromise();
  }

  getAllPatients() {
    return this.http.get(`${this.url}/users/getAllPatients`).toPromise();
  }

  getAppointmentById(id) {
    return this.http.get(`${this.url}/appointment/${id}`).toPromise();
  }

  getDateTimeString(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    return day + "." + month + "." + year + ". " + hour + ":" + minutes;
  }

  setNonWorkingDays(notWorkingDays) {
    return this.http.post(`${this.url}/users/setNonWorkingDays`, notWorkingDays).toPromise();
  }

}
