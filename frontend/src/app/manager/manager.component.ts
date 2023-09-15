import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../services/manager.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  verifiedUsers = [];
  notVerifiedUsers = [];

  editingUser;

  isEditEnabled = false;

  specializationToAdd: string;
  specMessage: string;

  async getAllUsers() {
    try {
      const result = await this.managerService.getAllVerifiedUsers();
      this.verifiedUsers = result['users'];
      console.log(this.verifiedUsers);
    } catch (error: any) {
      console.log(error.error.error);
    }

    try {
      const result = await this.managerService.getAllNotVerifiedUsers();
      this.notVerifiedUsers = result['users'];
      console.log(this.notVerifiedUsers);
    } catch (error: any) {
      console.log(error.error.error)
    }
  }

  async verifyUser(user) {
    try {
      const result = await this.managerService.verifyUser(user);
      console.log(result);
      window.location.reload();
    } catch (error: any) {
      console.log(error.error.error);
    }
  }

  async declineUser(user) {
    try {
      const data = {
        username: user.username,
        email: user.email
      }
      const result = await this.managerService.blockUser(data);
      console.log(result);
      window.location.reload();
    } catch (error: any) {
      console.log(error.error.error);
    }
  }

  async enableEdit(user) {
    user.isEditEnabled = true;
  }

  async disableEdit(user) {
    user.isEditEnabled = false;
  }

  async editUser(user) {
    console.log(user)
    try {
      const result = await this.managerService.editUser(user);
      console.log(result);
      window.location.reload();
    } catch (error: any) {
      console.log(error.error.error);
    }
  }

  async deleteUser(user) {
    try {
      const result = await this.managerService.deleteUser(user);
      console.log(result);
      window.location.reload();
    } catch (error: any) {
      console.log(error.error.error);
    }
  }

  async addSpecialization() {
    if (!this.specializationToAdd) {
      this.specMessage = "You must enter a specialization"
      return;
    }
    try {
      const result = await this.managerService.addSpecialization({ specialization: this.specializationToAdd });
      console.log(result);
    } catch (error: any) {
      console.log(error.error.error);
    }
  }

}
