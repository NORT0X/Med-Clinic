import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUserFromStorage();
    if (this.currentUser != null) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  currentUser: User;
  isLogged: boolean;

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
