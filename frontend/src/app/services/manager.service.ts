import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:4000';

  getAllVerifiedUsers() {
    console.log("getAllUsers");
    return this.http.get(`${this.url}/manager/getAllVerifiedUsers`).toPromise();
  }

  getAllNotVerifiedUsers() {
    console.log("getAllUsers");
    return this.http.get(`${this.url}/manager/getAllNotVerifiedUsers`).toPromise();
  }

  verifyUser(user) {
    console.log("verifyUser");
    return this.http.post(`${this.url}/manager/verifyUser`, user).toPromise();
  }

  editUser(user) {
    return this.http.post(`${this.url}/manager/editUser`, user).toPromise();
  }

  blockUser(user) {
    return this.http.post(`${this.url}/manager/blockUser`, user).toPromise();
  }

  deleteUser(user) {
    return this.http.post(`${this.url}/manager/deleteUser`, user).toPromise();
  }
}
