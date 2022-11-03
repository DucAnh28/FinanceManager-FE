import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WalletCreateComponent} from "./wallet-create/wallet-create.component";
import { WalletListComponent } from './wallet-list/wallet-list.component';
import {RouterLink, RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

const routes:Routes=[{
  path:'wallet/list',
  component:WalletListComponent
},
  {
    path:'wallet/create',
    component:WalletCreateComponent
  }
]

@NgModule({
  declarations: [WalletListComponent,WalletCreateComponent],

    imports: [
        CommonModule,
        RouterLink,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
    ]
})
export class RoutingwalletModule { }
