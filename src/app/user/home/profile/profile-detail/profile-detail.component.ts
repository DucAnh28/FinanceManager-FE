import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {AppUser} from "../../../model/appUser";
import {AccountService} from "../../../../account/service/account.service";

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  appUser: AppUser

  constructor(private userService: UserService,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.userService.getUserById(this.accountService.currentUserValue.id).subscribe(data => {
      this.appUser = data;
    })
  }


}
