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

  findAllByWallet(id:number): Observable<any> {
     return this.httpClient.get(API + 'find-by-wallet/' + id);
  }

  findAll(): Observable<any> {
    console.log(API);
    return this.httpClient.get(API);

  }

  findById(id: number): Observable<any> {
    return this.httpClient.get(API + id);
  }

  save(payment: any): Observable<any>
  {
    return this.httpClient.post(API , payment);
  }

  update(id: number, payment: any): Observable<any> {
    return this.httpClient.put(API + id, payment);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(API + id);
  }


  findAllPaymentByCategoryID(id: any): Observable<any> {
    return this.httpClient.get(API + 'find-by-category/'+ id);
  }
showpaymentintime(startDate:Date,endDate:Date):Observable<Payment[]>{
    return this.httpClient.get<Payment[]>(API+'find-All-Transactions-during-time?startDate='+startDate+'&endDate='+endDate)
}


}
