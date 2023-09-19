import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  async login() {
    try {
      const result = await this.userService.login(this.username, this.password)
      if (result == null) {
        this.message = 'Incorrect username or password'
        return
      }
      console.log(result['user'])
      sessionStorage.setItem('user', JSON.stringify(result['user']));
      sessionStorage.setItem('token', result['token']);
      this.userService.setLogged(true);
      this.userService.setUser(result['user']);
      this.router.navigate([''])
    } catch(error: any) {
      this.message = error.error.error
    }
  }
}
