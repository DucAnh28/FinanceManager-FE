import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {Wallet} from "../../../model/wallet";
import {WalletService} from "../../../service/wallet.service";
import {ShareWalletService} from "../../../service/share-wallet.service";
import {AccountService} from "../../../../account/service/account.service";

@Component({
  selector: 'app-share-create',
  templateUrl: './share-create.component.html',
  styleUrls: ['./share-create.component.css']
})
export class ShareCreateComponent implements OnInit {
  select: string= "Chọn ví";
  userId: number = 0;
  // checkMail = false;
  walletByUser: Wallet[] =[];
  checkUser: boolean;
  username: string;
  submitted = false;
  constructor(
    private accountService: AccountService,
    private walletService: WalletService,
    private router: Router,
    private shareService: ShareWalletService
  ) {
    if (accountService.currentUserValue != null) {
      this.userId = accountService.currentUserValue.id;
    }
  }

  ngOnInit() {
    this.getALlWallet();
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
    if (this.shareForm.valid) {
      this.shareService.addNewShare(this.shareForm.get('wallet').value, this.shareForm.get('user').value).subscribe(() => {
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
}
