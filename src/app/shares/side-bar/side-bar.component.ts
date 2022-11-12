import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../account/service/account.service";
import {AppUser} from "../../user/model/appUser";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  appUser: AppUser = {};

  constructor(private accountService: AccountService) {
    accountService.getUserById().subscribe(data => {
      this.appUser = data;
    })
  }

  ngOnInit(): void {
  }

}
