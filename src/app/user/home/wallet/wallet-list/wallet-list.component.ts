import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Wallet} from "../wallet";
import {WalletService} from "../../../../service/wallet/wallet.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent implements OnInit {
  wallet:Wallet[]=[];
  constructor(private walletService:WalletService
              ){}

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.walletService.getAll().subscribe(wallets =>{
      this.wallet=wallets;
    })
  }


}
