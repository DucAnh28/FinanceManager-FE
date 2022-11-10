import {Component, ElementRef, NgModule, OnInit, ViewChild} from '@angular/core';
import {Wallet} from "../../../model/wallet";
import {WalletService} from "../../../service/wallet.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {finalize, Subscription} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup, NgModel} from "@angular/forms";
// import {CommonModule, NgIf} from "@angular/common"
import {NgFor} from "@angular/common";
import {getAll} from "@angular/fire/remote-config";
import {AppUser} from "../../../model/appUser";
import {AccountService} from "../../../../account/service/account.service";

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
  appUserWallet : AppUser ={}

  formCreat: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    money: new FormControl(),
    icon: new FormControl(),
    appUser : new FormControl()
  });

  money: number = null;

  constructor(private walletService: WalletService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private storage: AngularFireStorage,
              private accountService : AccountService) {
    this.appUserWallet.id = accountService.currentUserValue.id
  }
  formAddMoney:FormGroup=new FormGroup({
    id:new FormControl(),
    addmoney:new FormControl()
  })
  submitAddMoney(id:number){

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

  ngOnInit(): void {
    this.getAllMoney();
    this.getAll();
  }

  updateWallet() {
    this.walletService.editWallet(this.walletCurrent.id, this.walletCurrent).subscribe(() => {
      alert("Cập nhật ví thành công");
      this.getAll();
      this.getAllMoney();
    })
  }

  deleteWallet() {
    if (confirm("Do you sure about that action???")){
      this.walletService.deleteWallet(this.walletCurrent.id).subscribe(() => {
        alert('Delete Successful !');
        this.getAll();
        this.getAllMoney();
      }, e => {
        console.log(e);
      });
    }
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

  @ViewChild('uploadFile', {static: true})
  public avatarDom: ElementRef | undefined;
  selectedImage: any = null;
  arrayPicture = '';

  submitFile() {
    if (this.selectedImage != null) {
      const filePath = "wallet/" + this.selectedImage.name;
      const fileRef = this.storage.ref(filePath);
      console.log("fp", filePath)
      console.log("fr", fileRef)
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => (fileRef.getDownloadURL().subscribe(url => {
          this.arrayPicture = url;
          console.log(url)
        })))
      ).subscribe();
    }
  }
  uploadFileImg() {
    this.selectedImage = this.avatarDom?.nativeElement.files[0];
    console.log(this.selectedImage);
    this.submitFile();
  }
  submitCreate() {
    const wallet = this.formCreat.value;
    wallet.icon = this.arrayPicture
    wallet.appUser = this.appUserWallet;
    console.log(this.arrayPicture)
    this.walletService.saveWallet(wallet).subscribe(() => {
      this.formCreat.reset();
      alert('Create Successful !');
      this.getAll();
      this.getAllMoney();
    })
  }
}
