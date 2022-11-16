import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UserHomeComponent} from "./home/user-home/user-home.component";
import {WalletListComponent} from "./home/wallet/wallet-list/wallet-list.component";
import {ProfileDetailComponent} from "./home/profile/profile-detail/profile-detail.component";
import {CommonModule} from "@angular/common";
import {PaymentComponent} from "./home/payment/payment.component";
import {CategoryComponent} from "./home/category/category.component";
import {ShareWalletComponent} from "./home/share-wallet/share-wallet.component";
import {ReportComponent} from "./home/report/report.component";

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
      {
        path: "category",
        component: CategoryComponent
      },
      {
        path: "share",
        component: ShareWalletComponent
      },
      {
        path: "report",
        component: ReportComponent
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
