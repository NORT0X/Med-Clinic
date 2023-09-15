import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user_id = window.location.href.split('/')[4];
    console.log(this.user_id)
    this.getUserInfo();
  }


  user_id;
  user: User;

  async getUserInfo() {
    try {
      const result = await this.userService.getUserById(this.user_id);
      this.user = result['user'];
      console.log(this.user)
    } catch (error) {
      console.log(error)
    }
  }
}
