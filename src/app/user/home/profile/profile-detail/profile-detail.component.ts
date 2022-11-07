import {Component, OnInit} from '@angular/core';
import {AppUser} from "../../../model/appUser";
import {AccountService} from "../../../../account/service/account.service";

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  appUser: AppUser ={}

  constructor(private accountService: AccountService) {
    this.accountService.getUserById().subscribe(data => {
      this.appUser = data;
    })
  }

  ngOnInit(): void {

  }


}
