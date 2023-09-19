import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ManagerService } from '../services/manager.service';
import { UserService } from '../services/user.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  constructor(private userService: UserService, private validatorService: ValidatorService, private managerService: ManagerService) { }

  doctorToAdd: User = {} as User;
  message: string;
  image = null;
  isImageCorrect: boolean = false;

  specializations;

  ngOnInit(): void {
    this.getSpecializations();
  }

  async addDoctor() {
    try {
      console.log(this.image)
      if(this.image) {
        console.log('test?')
        const isDimensionsCorrect = await this.checkImageDimensions(this.image);
        if (!isDimensionsCorrect) {
          this.message = "Image dimensions must be min(100x100), max(300x300)";
          return;
        }
      }

      if(this.check_required()) {
        this.message='You must fill all input fields!'
        return;
      }

      if (!this.validatorService.isValidPassword(this.doctorToAdd.password)) {
        this.message = "Invalid password"
        return;
      }

      if (!this.validatorService.isValidEmail(this.doctorToAdd.email)) {
        this.message = "Invalid email"
        return;
      }
  
      this.doctorToAdd.userType = "Doctor";
      this.doctorToAdd.verified = true;

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
      formData.append('user', JSON.stringify(this.doctorToAdd));

      console.log('test')
      const result = await this.userService.register(formData)
      console.log(result)
      window.location.reload();
    } catch(error: any) {
      this.message = error
      console.log(error)
    }
  }

  fileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.image = fileList[0];
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

  check_required(): boolean {
    if(!this.doctorToAdd.username || !this.doctorToAdd.password || !this.doctorToAdd.phone || !this.doctorToAdd.email || !this.doctorToAdd.address){
      return true
    }
    if((this.doctorToAdd.userType == 'Patient' && (!this.doctorToAdd.firstname || !this.doctorToAdd.lastname)) ||
    (this.doctorToAdd.userType == 'Doctor' && (!this.doctorToAdd.firstname || !this.doctorToAdd.lastname || !this.doctorToAdd.licenseID || !this.doctorToAdd.branch || !this.doctorToAdd.specialization))){
      return true;
    }
    return false;
  }

  async getSpecializations() {
    try {
      const result = await this.managerService.getSpecializations();
      this.specializations = result['specializations'];
      console.log(this.specializations);
    } catch (error: any) {
      console.log(error.error.error);
    }
  }

}
