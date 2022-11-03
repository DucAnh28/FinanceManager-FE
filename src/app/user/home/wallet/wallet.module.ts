import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WalletListComponent} from "./wallet-list/wallet-list.component";
import {WalletCreateComponent} from "./wallet-create/wallet-create.component";
import {WalletEditComponent} from "./wallet-edit/wallet-edit.component";
import {WalletDeleteComponent} from "./wallet-delete/wallet-delete.component";
import {RoutingwalletModule} from "./routingwallet.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [WalletListComponent,WalletCreateComponent,WalletEditComponent,WalletDeleteComponent],
  imports: [
    CommonModule,
    RoutingwalletModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WalletModule { }
