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
import { UserHomeComponent } from './home/user-home/user-home.component';
import {SharesModule} from "../shares/shares.module";
import {PaymentComponent} from "./home/payment/payment.component";
import {AddCategoryComponent} from "./home/category/add-category/add-category.component";
import {ShowCategoryComponent} from "./home/category/show-category/show-category.component";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [UserHomeComponent,ProfileDetailComponent,PaymentComponent, AddCategoryComponent, ShowCategoryComponent],
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
    NgxPaginationModule,
  ]
})
export class UserModule {
}
