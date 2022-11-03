import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home/homepage/home.component";
import {UserRoutingModule} from "./user-routing.module";
import { ProfileComponent } from './home/profile/profile-detail/profile.component';

@NgModule({
  declarations: [HomeComponent, ProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
