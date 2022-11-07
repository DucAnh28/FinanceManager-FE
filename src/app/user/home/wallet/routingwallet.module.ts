import {NgModule} from '@angular/core';
import {WalletCreateComponent} from "./wallet-create/wallet-create.component";
import {WalletListComponent} from './wallet-list/wallet-list.component';
import {RouterModule, Routes} from "@angular/router";
import {WalletDeleteComponent} from './wallet-delete/wallet-delete.component';
import {WalletEditComponent} from './wallet-edit/wallet-edit.component';

const routes: Routes = [
  {
    path: '',
    component: WalletListComponent
  },
  {
    path: 'create',
    component: WalletCreateComponent
  },
  {
    path: 'list/delete/:id',
    component: WalletDeleteComponent
  },
  {
    path: 'list/edit/:id',
    component: WalletEditComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RoutingwalletModule {
}
