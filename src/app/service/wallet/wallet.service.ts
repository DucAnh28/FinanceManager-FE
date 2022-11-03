import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Wallet} from "../../wallet/wallet";
import {environment} from "../../../environments/environment";

const api_URL=`${environment.api_url}`;

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Wallet[]>{
    return this.http.get<Wallet[]>(api_URL + '/wallet');
  };
  saveWallet(wallet:Wallet):Observable<Wallet>{
    return this.http.post<Wallet>(api_URL+'/wallet/create',wallet)
  }
}
