import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  user: User
  image;
  isLogged: boolean = false;
  isPatient: boolean = false;
  isDoctor: boolean = false;
  isManager: boolean = false;

  ngOnInit(): void {
    this.user = this.userService.getUserFromStorage();
    if (this.user == null)
    {
      this.setFlags(false, false, false, false);
    } else {
      if (this.user.userType == "Patient"){
        this.setFlags(true, true, false, false);
      } else if (this.user.userType == "Doctor"){
        this.setFlags(true, false, true, false);
      } else if (this.user.userType == "Manager"){
        this.setFlags(true, false, false, true);
      }
    }
    console.log(this.user)
  }

  setFlags(isLogged, isPatient, isDoctor, isManager)
  {
    this.isLogged = isLogged;
    this.isPatient = isPatient;
    this.isDoctor = isDoctor;
    this.isManager = isManager;
  }
}
