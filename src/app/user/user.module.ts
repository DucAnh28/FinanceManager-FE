import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from "./user-routing.module";
import {ProfileDetailComponent} from './home/profile/profile-detail/profile-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfileEditComponent} from './home/profile/profile-edit/profile-edit.component';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {ProfilePasswordComponent} from "./home/profile/profile-password/profile-password.component";
import { UserHomeComponent } from './home/user-home/user-home.component';
import {SharesModule} from "../shares/shares.module";

@NgModule({
  declarations: [ProfileDetailComponent, ProfileEditComponent, ProfilePasswordComponent, UserHomeComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharesModule
  ]
})
export class UserModule {
}
