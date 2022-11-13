import {Component, ElementRef, NgModule, OnInit, ViewChild} from '@angular/core';
import {Wallet} from "../../../model/wallet";
import {WalletService} from "../../../service/wallet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize, Subscription} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup, NgForm, NgModel} from "@angular/forms";
import {AppUser} from "../../../model/appUser";
import {AccountService} from "../../../../account/service/account.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent implements OnInit {
  sub: Subscription;
  walletCurrent: Wallet = {};
  walletList: Wallet[] = [];
  Form: FormGroup
  addMoney123: number | undefined;
  appUserWallet: AppUser = {}

  formCreat: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    money: new FormControl(),
    icon: new FormControl(),
    appUser: new FormControl()
  });

  money: number = null;

  constructor(private walletService: WalletService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private storage: AngularFireStorage,
              private accountService: AccountService) {
    this.appUserWallet.id = accountService.currentUserValue.id
  }

  addMoneyForm(id: number) {
    this.walletService.findWalletById(id).subscribe(dates => {
      this.walletCurrent = dates;

    })
  }

  createForm(id: number) {
    this.walletService.findWalletById(id).subscribe(data => {
      console.log(this.walletCurrent)
      this.walletCurrent = data;
      this.Form = new FormGroup({
        id: new FormControl(),
        name: new FormControl(),
        money: new FormControl(),
        icon: new FormControl(),
      })
    })
  }

  submitCreate() {
    const wallet = this.formCreat.value;
    wallet.icon = this.arrayPicture1
    wallet.appUser = this.appUserWallet;
    console.log(this.arrayPicture1)
    this.walletService.saveWallet(wallet).subscribe(data => {
      this.formCreat.reset();
      if (data !== null) {
        Swal.fire('Success',
          'You Have Successfully Added A New Wallet',
          'success')
      }
      this.getAll();
      this.getAllMoney();
    })
  }

  ngOnInit(): void {
    this.getAllMoney();
    this.getAll();
  }

  updateWallet() {
    this.walletCurrent.icon = this.arrayPicture2
    this.walletService.editWallet(this.walletCurrent.id, this.walletCurrent).subscribe(data => {
      if (data !== null) {
        Swal.fire('Success',
          'You Update Your Wallet Successful',
          'success')
      }
      this.getAll();
      this.getAllMoney();

    })
  }

  addMoney(addFrom: NgForm) {
    console.log(addFrom)
    console.log(this.addMoney123)
    this.walletService.addMoney(this.walletCurrent.id, this.addMoney123).subscribe(data => {
      console.log(data)
      if (data !== null) {
        Swal.fire('Success',
          'You Have Successfully Added Money To Your Wallet',
          'success')

      }
      if (this.addMoney123 == 0) {
        Swal.fire("Fail",
          "Some Thing Wrong",
          "error")

      }
      this.getAll();
      this.getAllMoney();
    });

  }

  deleteWallet() {
    Swal.fire({
      title: 'Are You Sure?',
      text: "You Won't Be Able To Revert This!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No Keep It',
      confirmButtonText: 'Yes, Delete It!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.walletService.deleteWallet(this.walletCurrent.id).subscribe(data => {
          this.getAll();
          this.getAllMoney();
        }, e => {
          console.log(e);
        });
        Swal.fire(
          'Deleted!',
          'Your Wallet Has Been Deleted.',
          'success'
        )
      }
    })


  }

  getAll() {
    this.walletService.getAll().subscribe(wallets => {
      this.walletList = wallets;

    })
  }

  getAllMoney() {
    this.walletService.getAllMoneyByUser().subscribe(totalmoney => {
      this.money = totalmoney;
    })
  }

  @ViewChild('uploadFileCreat', {static: true})
  public avatarDom1: ElementRef | undefined;
  selectedImage1: any = null;
  arrayPicture1 = '';

  submitFileCreat() {
    if (this.selectedImage1 != null) {
      const filePath = "wallet/" + this.selectedImage1.name;
      const fileRef = this.storage.ref(filePath);
      console.log("fp", filePath)
      console.log("fr", fileRef)
      this.storage.upload(filePath, this.selectedImage1).snapshotChanges().pipe(
        finalize(() => (fileRef.getDownloadURL().subscribe(url => {
          this.arrayPicture1 = url;
          console.log(url)
        })))
      ).subscribe();
    }
  }

  uploadFileImgCreate() {
    this.selectedImage1 = this.avatarDom1?.nativeElement.files[0];
    console.log(this.selectedImage1);
    this.submitFileCreat();
  }


  @ViewChild('uploadFileEdit', {static: true})
  public avatarDom2: ElementRef | undefined;
  selectedImage2: any = null;
  arrayPicture2 = '';

  submitFileEdit() {
    if (this.selectedImage2 != null) {
      const filePath = "wallet/" + this.selectedImage2.name;
      const fileRef = this.storage.ref(filePath);
      console.log("fp", filePath)
      console.log("fr", fileRef)
      this.storage.upload(filePath, this.selectedImage2).snapshotChanges().pipe(
        finalize(() => (fileRef.getDownloadURL().subscribe(url => {
          this.arrayPicture2 = url;
          console.log(url)
        })))
      ).subscribe();
    }
  }

  uploadFileImgEdit() {
    this.selectedImage2 = this.avatarDom2?.nativeElement.files[0];
    console.log(this.selectedImage2);
    this.submitFileEdit();
  }

  numberWithCommas(x: number): string {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

}
