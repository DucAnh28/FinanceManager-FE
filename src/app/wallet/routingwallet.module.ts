import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WalletCreateComponent} from "./wallet-create/wallet-create.component";
import { WalletListComponent } from './wallet-list/wallet-list.component';
import {RouterLink, RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { WalletDeleteComponent } from './wallet-delete/wallet-delete.component';
import { WalletEditComponent } from './wallet-edit/wallet-edit.component';

const routes:Routes=[{
  path:'wallet/list',
  component:WalletListComponent
},
  {
    path:'wallet/create',
    component:WalletCreateComponent
  },
  {
    path:'wallet/delete/:id',
    component:WalletDeleteComponent
  },
  {
    path:'wallet/edit/:id',
    component:WalletEditComponent
  }
]

@NgModule({
  declarations: [WalletListComponent,WalletCreateComponent, WalletDeleteComponent, WalletEditComponent],

    imports: [
        CommonModule,
        RouterLink,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        FormsModule
    ]
})
export class RoutingwalletModule { }