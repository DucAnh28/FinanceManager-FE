import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from "./user-routing.module";
import {ProfileDetailComponent} from './home/profile/profile-detail/profile-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {UserHomeComponent} from './home/user-home/user-home.component';
import {SharesModule} from "../shares/shares.module";
import {MdbModalModule} from 'mdb-angular-ui-kit/modal';
import {WalletListComponent} from "./home/wallet/wallet-list/wallet-list.component";
import {PaymentComponent} from "./home/payment/payment.component";
import {CategoryComponent} from './home/category/category.component';
import { DatepickerComponent } from './home/datepicker/datepicker.component';


@NgModule({
  declarations: [UserHomeComponent, ProfileDetailComponent, WalletListComponent, PaymentComponent, CategoryComponent, DatepickerComponent],
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
    SharesModule,
    MdbModalModule
  ]
})
export class UserModule {
}
