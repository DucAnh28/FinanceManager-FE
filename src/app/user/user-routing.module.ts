import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProfileDetailComponent} from "./home/profile/profile-detail/profile-detail.component";
import {ProfileEditComponent} from "./home/profile/profile-edit/profile-edit.component";
import {ProfilePasswordComponent} from "./home/profile/profile-password/profile-password.component";

let routes: Routes = [
  {
    path: "profile",
    component: ProfileDetailComponent
  },
  {
    path: "profile/edit",
    component: ProfileEditComponent
  },
  {
    path: "profile/password",
    component: ProfilePasswordComponent
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
