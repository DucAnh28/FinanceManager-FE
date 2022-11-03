import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home/homepage/home.component";
import {UserRoutingModule} from "./user-routing.module";
import {ProfileDetailComponent} from './home/profile/profile-detail/profile-detail.component';

@NgModule({
  declarations: [HomeComponent, ProfileDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule {
}
