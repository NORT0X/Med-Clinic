import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:4000';

  getAllVerifiedUsers() {
    console.log("getAllUsers");
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.get(`${this.url}/manager/getAllVerifiedUsers`, { headers }).toPromise();
  }

  getAllNotVerifiedUsers() {
    console.log("getAllUsers");
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.get(`${this.url}/manager/getAllNotVerifiedUsers`, {headers}).toPromise();
  }

  verifyUser(user) {
    console.log("verifyUser");
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.post(`${this.url}/manager/verifyUser`, user, { headers }).toPromise();
  }

  editUser(user) {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.post(`${this.url}/manager/editUser`, user, {headers}).toPromise();
  }

  blockUser(user) {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })

    return this.http.post(`${this.url}/manager/blockUser`, user, { headers }).toPromise();
  }

  deleteUser(user) {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.post(`${this.url}/manager/deleteUser`, user, { headers }).toPromise();
  }

  addDoctor(doctor) {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.post(`${this.url}/manager/addDoctor`, doctor, { headers }).toPromise();
  }

  addSpecialization(specialization) {
    let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.post(`${this.url}/manager/addSpecialization`, specialization, { headers }).toPromise();
  }

  getSpecializations() {
    return this.http.get(`${this.url}/manager/getSpecializations`).toPromise();
  }

  transformToPassword(value: string): string {
    let result = '';
    for (let i = 0; i < value.length; i++) {
      result += '*';
    }
    return result;
  }
}
