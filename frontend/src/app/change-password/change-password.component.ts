import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.getUserFromStorage();
  }
  user;
  message;
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;

  async change() {
    if(this.oldPassword != this.user.password) {
      this.message = 'Old password is incorrect!'
    }

    if (this.newPassword != this.newPasswordConfirm) {
      this.message = 'New password and confirm password do not match!'
    }

    if (this.newPassword == this.oldPassword) {
      this.message = 'New password cannot be the same as old password!'
    }
    this.user.password = this.newPassword;
    try {
      const result = await this.userService.changePassword(this.user);
      console.log(result);
      this.message = 'Password changed successfully!'
      this.userService.logout();
      this.router.navigate(['/login']);
    } catch(error: any) {
      this.message = error.error.error
    }
  }

}
