import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { ShowCategoryComponent } from './category/show-category/show-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowCategoryComponent,
    AddCategoryComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
