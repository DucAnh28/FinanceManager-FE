import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UserHomeComponent} from "./home/user-home/user-home.component";
import {WalletListComponent} from "./home/wallet/wallet-list/wallet-list.component";
import {ProfileDetailComponent} from "./home/profile/profile-detail/profile-detail.component";
import {CommonModule} from "@angular/common";
import {PaymentComponent} from "./home/payment/payment.component";
import {AuthGuard} from "../helper/auth-guard";

let routes: Routes = [
  {
    path: "",
    component: UserHomeComponent,
    children: [
      {
        path: "wallet",
        component: WalletListComponent
      },
      {
        path: "payment",
        component: PaymentComponent
      },
      {
        path: "profile",
        component: ProfileDetailComponent
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
