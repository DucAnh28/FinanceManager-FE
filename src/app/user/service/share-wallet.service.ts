import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShareWallet} from "../model/share-wallet";
const API = 'http://localhost:8080/share/';
@Injectable({
  providedIn: 'root'
})
export class ShareWalletService {

  constructor(
    private http: HttpClient
  ) { }

  addNewShare(walletId: number, username:string): Observable<ShareWallet> {

      // @ts-ignore
    return this.http.post<ShareWallet>(`${API}/create/${walletId}?username=${username}`)
  }

  getAllShare(userId: any): Observable<ShareWallet[]> {
    return this.http.get<ShareWallet[]>(`${API}/list/${userId}`)
  }
  stopShare(shareId: any) : Observable<any> {
    return this.http.delete(`${API}/delete/${shareId}`)
  }
}
