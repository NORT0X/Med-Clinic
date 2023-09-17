import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:4000';


  getNotificationsForUser(userId) {
    return this.http.get(this.url + '/notification/getAllNotificationsForUser/' + userId).toPromise(); 
  }

  sendNotification(notification) {
    return this.http.post(this.url + '/notification/sendNotification', notification).toPromise();
  }

  seeNotification(notification) {
    return this.http.post(this.url + '/notification/seeNotification', notification).toPromise();
  }
}
