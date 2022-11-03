import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home/home.component";
import {UserRoutingModule} from "./user-routing.module";
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [HomeComponent, ProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
