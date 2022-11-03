import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../account/service/account.service";
import {Observable} from "rxjs";
import {AppUser} from "../model/appUser";

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient,
              private accountService: AccountService) {
  }

  appUser : AppUser

  getUserById(id: number): Observable<AppUser> {
    return this.http.get<AppUser>(`${API_URL}/user/${id}`);
  }

  editUserById(id: number, appUser: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(`${API_URL}/user/${id}`,appUser)
  }
}
