import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppUser} from "../../../model/appUser";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account/service/account.service";
import {FormControl, FormGroup} from "@angular/forms";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  editUser: AppUser = {};
  editForm: FormGroup;

  constructor(private accountService: AccountService,
              private router: Router,
              private storage: AngularFireStorage
  ) {

  }

  ngOnInit(): void {
    this.accountService.getUserById().subscribe(data => {
      this.editUser = data;
      console.log(this.editUser);
      this.editForm = new FormGroup({
        id: new FormControl(this.editUser.id),
        username: new FormControl(this.editUser.username),
        email: new FormControl(this.editUser.email),
        password: new FormControl(this.editUser.password),
        phone: new FormControl(this.editUser.phone),
        status: new FormControl(this.editUser.status),
        ava: new FormControl(),
        roles: new FormControl(this.editUser.roles)
      })
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
    this.accountService.editUserById(this.editUser.id,updateUser).subscribe(data => {
      if (data !== null) {
        console.log("thanh cong");
      }
    })
  }
}
