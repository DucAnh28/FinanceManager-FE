import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppUser} from "../../../model/appUser";
import {AccountService} from "../../../../account/service/account.service";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  appUser: AppUser ={}
  editForm: FormGroup;

  constructor(private accountService: AccountService,
              private storage: AngularFireStorage) {
    this.accountService.getUserById().subscribe(data => {
      this.appUser = data;
    })
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      id: new FormControl(this.appUser.id),
      username: new FormControl(this.appUser.username),
      email: new FormControl(this.appUser.email),
      password: new FormControl(this.appUser.password),
      phone: new FormControl(this.appUser.phone),
      status: new FormControl(this.appUser.status),
      ava: new FormControl(),
      roles: new FormControl(this.appUser.roles)
    })
  }

  @ViewChild('uploadAva', {static: true})
  public avatarDom: ElementRef | undefined;
  selectedImage: any = null;
  arrayPicture = '';

  submitFile() {
    if (this.selectedImage != null) {
      const avaPath = "user/" + this.selectedImage.name;
      const avaRef = this.storage.ref(avaPath);
      console.log("fp", avaPath)
      console.log("fr", avaRef)
      this.storage.upload(avaPath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => (avaRef.getDownloadURL().subscribe(url => {
          this.arrayPicture = url;
          console.log(url)
        })))
      ).subscribe();
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      console.log(target.files[0]);
      this.selectedImage = target.files[0];
      this.submitFile();
    }
  }

  editProfile() {
    const updateUser = this.editForm.value;
    updateUser.ava = this.arrayPicture;
    this.accountService.editUserById(this.appUser.id,updateUser).subscribe(data => {
      if (data !== null) {
        console.log("thanh cong");
      }
    })
  }


}
