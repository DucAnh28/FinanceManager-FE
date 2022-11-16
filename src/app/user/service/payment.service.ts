import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Payment} from "../model/payment";

const API = 'http://localhost:8080/payment/';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) {
  }

  findAllByWallet(id: number): Observable<any> {
    return this.httpClient.get(API + 'find-by-wallet/' + id);
  }

  findById(id: number): Observable<any> {
    return this.httpClient.get(API + id);
  }

  save(payment: any): Observable<any> {
    return this.httpClient.post(API, payment);
  }

  update(id: number, payment: any): Observable<any> {
    return this.httpClient.put(API + id, payment);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(API + id);
  }




  showpaymentintime(startDate: Date, endDate: Date, wallet_id: number): Observable<Payment[]> {
    let apicall = API + 'find-All-Transactions-during-time?startDate=' + startDate + '&endDate=' + endDate + '&wallet_id=' + wallet_id;
    console.log(apicall);
    return this.httpClient.get<Payment[]>(API + 'find-All-Transactions-during-time-by-wallet?startDate=' + startDate + '&endDate=' + endDate + '&wallet_id=' + wallet_id)
  }

}
