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
import { UserComponent } from './user/user.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorExtraComponent } from './doctor-extra/doctor-extra.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { ReviewComponent } from './review/review.component';
import { NotificationListComponent } from './notification-list/notification-list.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "patient", component: PatientComponent},
  {path: "doctor", component: DoctorComponent},
  {path: "unregistered", component: UnregisteredComponent},
  {path: "password-change", component: ChangePasswordComponent},
  {path: "profile", component: ProfileComponent},
  {path: "user/:id", component: UserComponent},
  {path: "doctors", component: DoctorListComponent},
  {path: "extra", component: DoctorExtraComponent},
  {path: "appointments", component: AppointmentListComponent},
  {path: "review/:id", component: ReviewComponent},
  {path: "notifications", component: NotificationListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
