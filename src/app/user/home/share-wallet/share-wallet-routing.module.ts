import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShareListComponent} from "./share-list/share-list.component";
import {ShareCreateComponent} from "./share-create/share-create.component";


const routes: Routes = [
  {
    path: 'list-share',
    component: ShareListComponent
  },
  {
    path: 'create-share',
    component: ShareCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareWalletRoutingModule { }
