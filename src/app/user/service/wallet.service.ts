import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Wallet} from "../model/wallet";
import {environment} from "../../../environments/environment";
import {AccountService} from "../../account/service/account.service";

const api_URL=`${environment.api_url}`;

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http:HttpClient,
              private accountService:AccountService,
              // private walletService:WalletService
               ) { }

  getAll():Observable<Wallet[]>{
   let user_id=this.accountService.currentUserValue.id;
    return this.http.get<Wallet[]>(api_URL + '/wallet?user_id='+user_id);
  };
  saveWallet(wallet:Wallet):Observable<Wallet>{
    return this.http.post<Wallet>(api_URL+'/wallet/create',wallet)
  }
  findWalletById(id:number){
    return this.http.get<Wallet>(`${api_URL}/wallet/${id}`)
  }
  deleteWallet(id:number| undefined):Observable<Wallet>{
    return this.http.delete<Wallet>(`${api_URL}/wallet/${id}`);
  }
  editWallet(id:number|undefined,wallet:Wallet):Observable<Wallet>{
    return this.http.put<Wallet>(`${api_URL}/wallet/${id}`,wallet);
  }
  getAllMoneyByUser():Observable<number>{
    let user_id=this.accountService.currentUserValue.id;
    return this.http.get<number>(`${api_URL}/wallet/money/`+user_id);
  }
  addMoney(id:number|undefined,money:number|undefined):Observable<number|undefined>{
    return this.http.get<number>(`${api_URL}/wallet/addmoney/${id}?money=`+money);
  }
}
