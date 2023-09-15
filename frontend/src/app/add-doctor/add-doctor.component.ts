import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ManagerService } from '../services/manager.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  constructor(private userService: UserService, private managerService: ManagerService) { }

  doctorToAdd: User = {} as User;
  message: string;
  image;
  isImageCorrect: boolean = false;

  specializations;

  ngOnInit(): void {
    this.getSpecializations();
  }

  async addDoctor() {
    this.checkImageDimensions(this.image)
    if(!this.isImageCorrect) {
      return;
    }

    this.doctorToAdd.userType = "Doctor";
    this.doctorToAdd.verified = true;

    let formData = new FormData();
    formData.append('image', this.image);
    formData.append('imageName', this.image.name);
    formData.append('user', JSON.stringify(this.doctorToAdd));

    if(this.check_required()) {
      this.message='You must fill all input fields!'
      return;
    }

    try {
      const result = await this.userService.register(formData)
      console.log(result.error)
      window.location.reload();
    } catch(error: any) {
      this.message = error.error.error
    }
  }

  fileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.image = fileList[0];
    }
  }

  checkImageDimensions(image: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
      
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        console.log(`Image dimensions: ${width} x ${height}`);

        if(width < 100 || width > 300 || height < 100 || height > 300) {
          this.message = "Image dimensions must be min(100x100), max(300x300)"
          this.image = null;
          this.isImageCorrect = false;
        }
        else {
          this.isImageCorrect = true;
        }
      };
    };

    reader.readAsDataURL(image);
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
