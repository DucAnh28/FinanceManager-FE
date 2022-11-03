import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Wallet} from "../wallet";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {WalletService} from "../../service/wallet/wallet.service";

@Component({
  selector: 'app-wallet-delete',
  templateUrl: './wallet-delete.component.html',
  styleUrls: ['./wallet-delete.component.css']
})
export class WalletDeleteComponent implements OnInit {

  sub: Subscription;

  wallet: Wallet = {};

  id: number | undefined;

  constructor(private walletService: WalletService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getWallet(this.id);
    })
  }

  ngOnInit() {
  }

  getWallet(id: number) {
    this.walletService.findWalletById(id).subscribe(wallets => {
      this.wallet = wallets;
    });
  }

  deleteTour(id: number | undefined) {
    if (confirm("Bạn chắc chắn muốn xoá ví này chứ???")){
    this.walletService.deleteWallet(id).subscribe(() => {
      alert('Đã xóa thành công !');
      this.router.navigate(["wallet/list"]);
    }, e => {
      console.log(e);
    });
    }
  }

}
