import { Component, OnInit } from '@angular/core';
import {PaymentService} from "../../service/payment.service";
import {Payment} from "../../model/payment";
import {AccountService} from "../../../account/service/account.service";
import {PaymentInDay} from "../../model/payment-in-day";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
payment:PaymentInDay[]=[];
userID : number =0;
  constructor(
    private paymentService: PaymentService,
    private accountService: AccountService
  ) {
    accountService.getUserById().subscribe(data=>{
      this.userID = data.id;
      this.showPaymentToday();
    })
  }

  ngOnInit(): void {
    // this.showPaymentToday();
  }

  showPaymentToday() {
    this.paymentService.showpaymentToday(this.userID).subscribe(data=>{
      this.payment = data
    });
  }

}
