import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {RouterModule} from "@angular/router";
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [NavBarComponent, SideBarComponent, FooterComponent],
  exports: [
    NavBarComponent,
    SideBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharesModule { }
