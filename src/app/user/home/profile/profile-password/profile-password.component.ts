import {Component, OnInit} from '@angular/core';
import {AppUser} from "../../../model/appUser";
import {ProfileDetailComponent} from "../profile-detail/profile-detail.component";
import {Router} from "@angular/router";
import {AccountService} from "../../../../account/service/account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.css']
})
export class ProfilePasswordComponent implements OnInit {
  editUser: AppUser;
  editForm: FormGroup = new FormGroup({
    oldPassword: new FormControl("", [Validators.required, Validators.pattern("^([A-Z]{1})([a-z]{4,})([0-9]{1,})")]),
    newPassword: new FormControl("", [Validators.required, Validators.pattern("^([A-Z]{1})([a-z]{4,})([0-9]{1,})")]),
    confirmPassword: new FormControl("", [Validators.required]),
  })
  message: string;

  constructor(private accountService: AccountService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.accountService.getUserById().subscribe(data => {
      this.editUser = data;
      console.log(this.editUser);
    })
  }

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
    if (this.oldPassword.value !== this.editUser.password) {
      this.message = "Your Old Password Is Wrong"
    } else this.message = null;
  }

  changePassword() {
    this.checkOldPassword();
    const changePass = this.editForm.value;
    this.accountService.changePassword(this.editUser.id, changePass).subscribe(data => {
      if (data !== null) {
        console.log("Thanh cong")
        this.router.navigate(["/user/profile"])
      }
    })
  }
}
