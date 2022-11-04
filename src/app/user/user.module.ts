import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from "./user-routing.module";
import {ProfileDetailComponent} from './home/profile/profile-detail/profile-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileEditComponent } from './home/profile/profile-edit/profile-edit.component';

@NgModule({
  declarations: [ProfileDetailComponent, ProfileEditComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class UserModule {
}
