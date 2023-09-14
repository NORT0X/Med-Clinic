import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUserFromStorage();
  }

  user: User;
  image;
  isEditEnabled = false;

  fileChange(event) {
    this.image = event.target.files[0];
  }

  async changeImage() {
    let formData = new FormData();
    formData.append('user', JSON.stringify(this.user));
    formData.append('image', this.image);
    formData.append('imageName', this.image.name);

    try {
      let result = await this.userService.changeImage(formData);
      console.log(result);

      result  = await this.userService.login(this.user.username, this.user.password);
      sessionStorage.setItem('user', JSON.stringify(result['user']));
      sessionStorage.setItem('token', result['token']);

      window.location.reload();
    } catch (error: any) {
      console.log(error.error.error);
    }
  }

  enableEdit() {
    this.isEditEnabled = true;
  }

  disableEdit() {
    this.isEditEnabled = false;
  }

  async editUser() {
    try {
      let result = await this.userService.editUser(this.user);
      console.log(result);

      result  = await this.userService.login(this.user.username, this.user.password);
      sessionStorage.setItem('user', JSON.stringify(result['user']));
      sessionStorage.setItem('token', result['token']);

      window.location.reload();
    } catch (error: any) {
      console.log(error.error.error);
    }
  }


}
