import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
     private router: Router,
     private validatorService: ValidatorService) { }

  ngOnInit(): void {
    this.userType = "Patient"
  }

  image = null;
  isImageCorrect: boolean = false;

  userType: string = "";

  username: string;
  password: string;
  password_confirm: string;
  phone: string;
  email: string;
  branch: string;
  specialization: string;
  address: string;
  licenseID: number;
  firstname: string;
  lastname: string;

  message: string;

  async register() {
    try{
      if(this.image) {
        const isDimensionsCorrect = await this.checkImageDimensions(this.image);
        if (!isDimensionsCorrect) {
          this.message = "Image dimensions must be min(100x100), max(300x300)";
          return;
        }
      }

      let user = new User();
      user.username = this.username;
      user.password = this.password;
      user.phone = this.phone;
      user.email = this.email;
      user.branch = this.branch;
      user.specialization = this.specialization;
      user.licenseID = this.licenseID;
      user.address = this.address;
      user.firstname = this.firstname;
      user.lastname = this.lastname;
      user.userType = this.userType;
      user.verified = false;

      if(this.check_required()) {
        this.message='You must fill all input fields!'
        return;
      }

      if(user.password !== this.password_confirm) {
        this.message = "Passwords do not match"
        return;
      }

      if (!this.validatorService.isValidPassword(user.password)) {
        this.message = "Invalid password"
        return;
      }

      if (!this.validatorService.isValidEmail(user.email)) {
        this.message = "Invalid email"
        return;
      }

      let hasImage = false;
      let formData = new FormData();
      if(this.image) {
        hasImage = true;
        formData.append('image', this.image);
        formData.append('imageName', this.image.name);
        formData.append('hasImage', hasImage.toString());
      }
      else {
        formData.append('hasImage', hasImage.toString());
      }
      formData.append('user', JSON.stringify(user));

      const result = await this.userService.register(formData)
      console.log(result.error)
      this.router.navigate(['login'])
    } catch(error: any) {
      this.message = error.error.error
    }
    
  }

  check_required(): boolean {
    if(!this.username || !this.password || !this.password_confirm || !this.phone || !this.email || !this.address){
      return true
    }
    if((this.userType == 'Patient' && (!this.firstname || !this.lastname)) ||
    (this.userType == 'Doctor' && (!this.firstname || !this.lastname || !this.licenseID || !this.branch || !this.specialization))){
      return true;
    }
    return false;
  }

  fileChange(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  checkImageDimensions(image: File): Promise<boolean> {
    return new Promise((resolve) => {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
  
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          console.log(`Image dimensions: ${width} x ${height}`);
  
          if (width < 100 || width > 300 || height < 100 || height > 300) {
            this.message = "Image dimensions must be min(100x100), max(300x300)";
            this.image = null;
            this.isImageCorrect = false;
            resolve(false);
          } else {
            this.isImageCorrect = true;
            resolve(true);
          }
        };
      };
  
      reader.readAsDataURL(image);
    });
  }
}
