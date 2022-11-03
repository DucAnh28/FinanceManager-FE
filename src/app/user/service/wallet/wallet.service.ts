import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Wallet} from "../../model/wallet";
import {environment} from "../../../../environments/environment";

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
  findWalletById(id:number){
    return this.http.get<Wallet>(`${api_URL}/wallet/${id}`)
  }
  deleteWallet(id:number| undefined):Observable<Wallet>{
    return this.http.delete<Wallet>(`${api_URL}/wallet/${id}`);
  }
  editWallet(id:number|undefined,wallet:Wallet):Observable<Wallet>{
    return this.http.put<Wallet>(`${api_URL}/wallet/${id}`,wallet);
  }
}
