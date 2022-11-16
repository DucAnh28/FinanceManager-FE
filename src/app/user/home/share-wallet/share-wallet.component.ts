import { Component, OnInit } from '@angular/core';
import {Wallet} from "../../model/wallet";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {WalletService} from "../../service/wallet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AccountService} from "../../../account/service/account.service";
import {AppUser} from "../../model/appUser";
import {ShareWalletService} from "../../service/share-wallet.service";
import {PaymentService} from "../../service/payment.service";
import {Payment} from "../../model/payment";
@Component({
  selector: 'app-share-wallet',
  templateUrl: './share-wallet.component.html',
  styleUrls: ['./share-wallet.component.css']
})
export class ShareWalletComponent implements OnInit {

  select: string= "Chọn ví";
  userId: number = 0;
  // checkMail = false;
  walletByUser: Wallet[] =[];
  checkUser: boolean;
  username: string;
  submitted = false;
  walletsshare: Wallet[] = [];
  appUserWallet: AppUser = {}
  constructor(private walletService: WalletService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private storage: AngularFireStorage,
              private shareService: ShareWalletService,
              private paymentService : PaymentService,
              private accountService: AccountService) {
    this.appUserWallet.id = accountService.currentUserValue.id

    if (accountService.currentUserValue != null) {
      this.userId = accountService.currentUserValue.id;
    }
  }

  ngOnInit(): void {
    this.getAllWalletShare();

    this.getALlWallet();
  }
// viet share wallet

  getAllWalletShare() {
    this.shareService.getAllShare(this.appUserWallet.id).subscribe((wallets) => {
      this.walletsshare= wallets;
      console.log(wallets)
    });
  }
  shareForm: FormGroup = new FormGroup({
    wallet: new FormControl('', Validators.required),
    user: new FormControl('', Validators.required)
  })

  getALlWallet() {
    this.walletService.getAll().subscribe(wallets => {
      this.walletByUser = wallets;
    });
  }

  share() {
    this.submitted = true;
    console.log(this.shareForm.value)
    if (this.shareForm.valid) {
      this.shareService.addNewShare(this.shareForm.get('wallet').value, this.shareForm.get('user').value).subscribe((data) => {
        console.log(data)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Gửi thành công!',
          showConfirmButton: false,
          timer: 1500});
      },err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ví này dã được chia sẻ cho người dùng!',
          showConfirmButton: false,
          timer: 1500});
      })
    } else {
      // @ts-ignore
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Vui lòng nhập đúng định dạng!',
        showConfirmButton: false,
        timer: 1500});
    }
  }

  usernameCheck($event: any) {
    this.username = $event.value;
    // @ts-ignore
    this.accountService.getUserById(this.username).subscribe((check:boolean) => {
      this.checkUser = check;
    });
  }

  numberWithCommas(money: any): string {
    let parts = money.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  paymentList : Payment[] ;

  getPaymentList(id : number) {
    this.paymentService.findAllByWallet(id).subscribe(data => {
      this.paymentList = data;
      console.log("paymentList", this.paymentList);
    })
  }
}
