import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {JwtResponse} from "../model/jwt-response";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public currentUser: Observable<JwtResponse>;
  public currentUserSubject: BehaviorSubject<JwtResponse>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): JwtResponse {
    return this.currentUserSubject.value;
  }


  login(jwtResponse: JwtResponse): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${API_URL}/login`, ).pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
