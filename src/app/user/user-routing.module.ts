import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProfileDetailComponent} from "./home/profile/profile-detail/profile-detail.component";

let routes: Routes = [
  {
    path: "profile",
    component: ProfileDetailComponent
  },
  {
    path: "wallet",
    loadChildren: () => import('./home/wallet/wallet.module').then(module => module.WalletModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
