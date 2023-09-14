import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { UnregisteredComponent } from './unregistered/unregistered.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "patient", component: PatientComponent},
  {path: "doctor", component: DoctorComponent},
  {path: "unregistered", component: UnregisteredComponent},
  {path: "password-change", component: ChangePasswordComponent},
  {path: "profile", component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
