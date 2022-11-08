import {Component, OnInit} from '@angular/core';
import {Wallet} from "../../../model/wallet";
import {WalletService} from "../../../service/wallet.service";

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent implements OnInit {
  wallet: Wallet[] = [];
  money:number=null;
  constructor(private walletService: WalletService){
  }

  ngOnInit(): void {
    this.getAllMoney();
    this.getAll();
  }

  getAll() {
    this.walletService.getAll().subscribe(wallets => {
      this.wallet = wallets;
    })
  }

  getAllMoney(){
    this.walletService.getAllMoneyByUser().subscribe(totalmoney =>{
      this.money=totalmoney;
    })
  }
}
