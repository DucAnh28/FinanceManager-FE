import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Wallet} from "../../../model/wallet";
import {WalletService} from "../../../service/wallet.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {finalize, Subscription} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent implements OnInit {
  sub:Subscription;
  walletEdit:Wallet={};
  walletList: Wallet[] = [];
  id:number|undefined;
  walletForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    money: new FormControl(),
    status: new FormControl(),
    icon: new FormControl(),
    user: new FormControl(),
  });

  money:number=null;
  constructor(private walletService: WalletService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private storage:AngularFireStorage) {
    this.sub = this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getWalletEdit(this.id);
    })
  }
  ngOnInit(): void {
    this.getAllMoney();
    this.getAll();
  }
  getWalletEdit(id:number){
    this.walletService.findWalletById(id).subscribe(wallets=>{
      this.walletEdit=wallets;
    })
  }

  updateWallet(){
    this.walletService.editWallet(this.walletEdit.id,this.walletEdit).subscribe(()=>{
      alert("Cập nhật ví thành công");
      this.router.navigate(['user/wallet']);
    })
  }
  deleteWallet(id: number | undefined) {
    if (confirm("Bạn chắc chắn muốn xoá ví này chứ???")){
      this.walletService.deleteWallet(id).subscribe(() => {
        alert('Đã xóa thành công !');
        this.router.navigate(["user/wallet"]);
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

  getAllMoney(){
    this.walletService.getAllMoneyByUser().subscribe(totalmoney =>{
      this.money=totalmoney;
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
    const wallet = this.walletForm.value;
    wallet.icon = this.arrayPicture
    console.log(this.arrayPicture)
    this.walletService.saveWallet(wallet).subscribe(() => {
      this.walletForm.reset();
      alert('Tạo thành công ');
    })
  }
}
