import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AccountRoutingModule} from "./account-routing.module";
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
