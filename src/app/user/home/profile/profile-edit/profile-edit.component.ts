import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {AppUser} from "../../../model/appUser";
import {ProfileDetailComponent} from "../profile-detail/profile-detail.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  editUser: AppUser;

  constructor(private userService: UserService,
              private profileDetail: ProfileDetailComponent,
              private router: Router,
  ) {}

  ngOnInit(): void {
    this.editUser = this.profileDetail.appUser;
    console.log(this.editUser);
  }

  editProfile() {
    this.userService.editUserById(this.editUser.id,this.editUser).subscribe(data=>{
        this.router.navigate(['/user/profile']);
    })
  }
}
