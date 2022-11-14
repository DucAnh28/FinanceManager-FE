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

  // findAll(): Observable<any> {
  //   // return this.httpClient.get(API + 'find-by-wallet/' + localStorage.getItem('ID_WALLET'));
  //   return this.httpClient.get(API , payment);
  // }

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

  // findAllByMonth(status: any): Observable<any> {
  //   const id = localStorage.getItem("ID_WALLET");
  //   return this.httpClient.get(API + `find-all-by-time?status=${status}&id=${id}`);
  // }

  // findAllTransactionsIncomeFor6Months(): Observable<any> {
  //   const id = localStorage.getItem("ID_WALLET");
  //   return this.httpClient.get(API + `find-all-income-6month/${id}`);
  // }
  //
  // findAllTransactionsExpenseFor6Months(): Observable<any> {
  //   const id = localStorage.getItem("ID_WALLET");
  //   return this.httpClient.get(API + `find-all-expense-6month/${id}`);
  // }
  //
  // findAllTransactions(startTime: any, endTime: any, status: any, from: any, to: any): Observable<any> {
  //   const id = localStorage.getItem("ID_WALLET");
  //   return this.httpClient.get(API + `find-all-transaction?startTime=${startTime}&endTime=${endTime}&status=${status}&from=${from}&to=${to}&id=${id}`);
  // }
  // findAllTransactionsByCategoryID(id: any): Observable<any> {
  //   return this.httpClient.get(API + 'find-by-category/'+ id);
  // }
  findAllPaymentByCategoryID(id: any): Observable<any> {
    return this.httpClient.get(API + 'find-by-category/'+ id);
  }
showpaymentintime(startDate:Date,endDate:Date):Observable<Payment[]>{
    return this.httpClient.get<Payment[]>(API+'find-All-Transactions-during-time?startDate='+startDate+'&endDate='+endDate)
}

// showPaymentInTimeByWallet(startDate:Date, endDate:Date):Observable<Payment[]>{
//     return this.httpClient.get<Payment[]>(API + 'find-All-Transactions-during-time-by-wallet?startDate=' + startDate + '&endDate=' + endDate + '$walletid=' + en)
// }
}
