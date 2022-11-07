import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../service/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.pattern("^([A-Z]{1})([a-z]{4,})([0-9]{1,})")]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(6)])
  })
  message : string;

  constructor(private accountService: AccountService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  get username() {
    return this.signupForm.get("username")
  }

  get email() {
    return this.signupForm.get("email")
  }

  get password() {
    return this.signupForm.get("password")
  }

  get confirmPassword() {
    return this.signupForm.get("confirmPassword")
  }

  signUp() {
    const form = this.signupForm.value;
    this.accountService.register(form).pipe().subscribe(data => {
      if (data == null) {
        this.message = "Tai khoan da ton tai";
      } else {
        this.router.navigate(['/login'])
      }
    })
  }

  comparePassword() {
    if (this.password.value !== this.confirmPassword.value) {
      this.confirmPassword.setErrors({confirmPassword: true});
    } else {
      this.confirmPassword.setErrors(null);
    }
  }
}
