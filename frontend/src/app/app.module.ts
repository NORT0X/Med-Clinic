import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { UnregisteredComponent } from './unregistered/unregistered.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManagerComponent } from './manager/manager.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { UserComponent } from './user/user.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { DoctorExtraComponent } from './doctor-extra/doctor-extra.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { ReviewComponent } from './review/review.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PatientComponent,
    DoctorComponent,
    UnregisteredComponent,
    ManagerComponent,
    ChangePasswordComponent,
    ProfileComponent,
    DoctorListComponent,
    UserComponent,
    AddDoctorComponent,
    MakeAppointmentComponent,
    DoctorExtraComponent,
    AppointmentListComponent,
    ReviewComponent,
    NotificationListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
