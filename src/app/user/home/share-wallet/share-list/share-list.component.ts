import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ShareWalletService} from "../../../service/share-wallet.service";
import {Wallet} from "../../../model/wallet";
import {AccountService} from "../../../../account/service/account.service";


@Component({
  selector: 'app-share-list',
  templateUrl: './share-list.component.html',
  styleUrls: ['./share-list.component.css']
})
export class ShareListComponent implements OnInit {
  wallets: Wallet[] = [];
  idUser: number = 0;

  constructor(
    private shareService: ShareWalletService,
    private router: Router,
    private accountService: AccountService
  ) {
    if (accountService.currentUserValue != null) {
      this.idUser = accountService.currentUserValue.id;
    }
  }

  ngOnInit() {
    this.getAllWallet();
  }

  getAllWallet() {
    this.shareService.getAllShare(this.idUser).subscribe((wallets) => {
      this.wallets = wallets;
    });
  }


}
