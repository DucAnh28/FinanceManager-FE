import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WalletService} from "../../../service/wallet.service";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.css']
})
export class WalletCreateComponent implements OnInit {
  walletForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    money: new FormControl(),
    status: new FormControl(),
    icon: new FormControl(),
    user: new FormControl(),
  });

  constructor(private walletService: WalletService,
              private storage: AngularFireStorage) {
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

  ngOnInit(): void {
  }

  submit() {
    const wallet = this.walletForm.value;
    wallet.icon = this.arrayPicture
    console.log(this.arrayPicture)
    this.walletService.saveWallet(wallet).subscribe(() => {
      this.walletForm.reset();
      alert('Tạo thành công ');
    })
  }
}
