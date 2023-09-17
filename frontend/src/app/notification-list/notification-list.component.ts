import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { User } from '../model/user';
import { Notification } from '../model/notification';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  constructor(private userService: UserService, private notificationService: NotificationService) { }

  async ngOnInit(){
    try {
      this.currentUser = this.userService.getUserFromStorage();
      if (this.currentUser!=null) {
        this.isVisible = true;
      }

      const result = await this.notificationService.getNotificationsForUser(this.currentUser._id);
      this.notifications = result['notifications'];
      this.notifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      console.log(this.notifications);
    } catch (error: any) {
      console.log(error.error.error);
    }
  }

  isVisible = false;
  currentUser: User;
  notifications: Notification[] = [];

  async seeNotification(notification: Notification) {
    try {
      await this.notificationService.seeNotification(notification);
      const result = await this.notificationService.getNotificationsForUser(this.currentUser._id);
      this.notifications = result['notifications'];
      this.notifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      console.log(this.notifications);
    } catch (error: any) {
      console.log(error.error.error);
    }
  }

  getDateAndTimeString(date) {
    return this.userService.getDateTimeString(new Date(date));
  }
}
