import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { PaymentComponent } from './user/home/payment/payment.component';
import { ShowCategoryComponent } from './user/home/category/show-category/show-category.component';
import { AddCategoryComponent } from './user/home/category/add-category/add-category.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    ShowCategoryComponent,
    AddCategoryComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
