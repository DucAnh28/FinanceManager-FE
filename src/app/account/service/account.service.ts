import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {JwtResponse} from "../model/jwt-response";
import {LoginForm} from "../model/login-form";
import {Role} from "../model/role";
import {AppUser} from "../../user/model/appUser";
import {ChangepassDTO} from "../../user/model/changepass-dto";
import {TokenDto} from "../model/token-dto";

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  role: Role[] = [
    {
      id: 1,
      name: "ROLE_ADMIN"
    },
    {
      id: 2,
      name: "ROLE_USER"
    }
  ]

  public currentUser: Observable<JwtResponse>;
  public currentUserSubject: BehaviorSubject<AppUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): JwtResponse {
    return this.currentUserSubject.value;
  }

  login(loginForm: LoginForm): Observable<JwtResponse> {
    return this.http.post<LoginForm>(`${API_URL}/login`, loginForm);
  }

  register(user: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(`${API_URL}/register`, user);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getUserById(): Observable<AppUser> {
    let user_id = this.currentUserValue.id;
    return this.http.get<AppUser>(`${API_URL}/user/${user_id}`);
  }

  editUserById(id: number, appUser: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(`${API_URL}/user/${id}`, appUser)
  }

  changePassword(id: number, changePass: ChangepassDTO): Observable<AppUser> {
    return this.http.post<AppUser>(`${API_URL}/user/${id}`, changePass)
  }

  facebook(tokenDto: TokenDto): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${API_URL}/oauth/fb`, tokenDto);
  }
}
