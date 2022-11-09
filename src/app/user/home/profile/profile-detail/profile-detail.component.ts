import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppUser} from "../../../model/appUser";
import {AccountService} from "../../../../account/service/account.service";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";


@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  appUser: AppUser = {}
  editForm: FormGroup;

  constructor(private accountService: AccountService,
              private storage: AngularFireStorage) {
    this.accountService.getUserById().subscribe(data => {
      this.appUser = data;
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
      console.log(this.editForm.value)
    })

  }

  ngOnInit(): void {
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
    this.accountService.editUserById(this.appUser.id, updateUser).subscribe(data => {
      if (data !== null) {
        Swal.fire('Success',
          'You Update Your Profile Successful',
          'success')
      }
    })
  }

  // Change Pass function

  changePassForm: FormGroup = new FormGroup({
    oldPassword: new FormControl("", [Validators.required, Validators.pattern("^([A-Z]{1})([a-z]{4,})([0-9]{1,})")]),
    newPassword: new FormControl("", [Validators.required, Validators.pattern("^([A-Z]{1})([a-z]{4,})([0-9]{1,})")]),
    confirmPassword: new FormControl("", [Validators.required]),
  })


  get oldPassword() {
    return this.editForm.get("oldPassword")
  }

  get newPassword() {
    return this.editForm.get("newPassword")
  }

  get confirmPassword() {
    return this.editForm.get("confirmPassword")
  }

  comparePassword() {
    if (this.newPassword.value !== this.confirmPassword.value) {
      this.confirmPassword.setErrors({confirmPassword: true});
    } else {
      this.confirmPassword.setErrors(null);
    }
  }

  checkOldPassword() {
    if (this.oldPassword.value !== this.appUser.password) {
      Swal.fire("Not Good","Your Old Password Is Wrong","warning")
    }
  }

  changePassword() {
    this.checkOldPassword();
    const changePass = this.editForm.value;
    this.accountService.changePassword(this.appUser.id, changePass).subscribe(data => {
      if (data !== null) {
        Swal.fire("Success","Change Your Password Successful !!","success")
      }
    })
  }

}
