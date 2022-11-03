import { Component, OnInit } from '@angular/core';
import {WalletService} from "../../service/wallet/wallet.service";
import {Subscription} from "rxjs";
import {Wallet} from "../wallet";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-wallet-edit',
  templateUrl: './wallet-edit.component.html',
  styleUrls: ['./wallet-edit.component.css']
})
export class WalletEditComponent implements OnInit {
  sub:Subscription;
  wallet:Wallet={};
  id:number|undefined;
  constructor(private walletService: WalletService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.sub = this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getWallet(this.id);
    })
  }
  getWallet(id:number){
    this.walletService.findWalletById(id).subscribe(wallets=>{
      this.wallet=wallets;
    })
  }
  ngOnInit(): void {
  }
  updateWallet(){
    this.walletService.editWallet(this.wallet.id,this.wallet).subscribe(()=>{
      alert("Cập nhật ví thành công");
      this.router.navigate(['wallet/list']);
    })
  }
}
