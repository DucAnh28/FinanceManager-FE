import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../service/payment.service";
import {AccountService} from "../../../account/service/account.service";
import {PaymentInDay} from "../../model/payment-in-day";
import {SumInDay} from "../../model/sum-in-day";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  payment: PaymentInDay[] = [];
  sumMoney: SumInDay ={};
  userID: number = 0;

  constructor(
    private paymentService: PaymentService,
    private accountService: AccountService,
  ) {
    accountService.getUserById().subscribe(data => {
      this.userID = data.id;
      this.showPaymentToday();
      this.getSumToday();
    })
  }

  ngOnInit(): void {
  }

  showPaymentToday() {
    this.paymentService.showpaymentToday(this.userID).subscribe(data => {
      this.payment = data
    });
  }

  getSumToday() {
    this.paymentService.getSumToday(this.userID).subscribe(data => {
      this.sumMoney = data[0];
    })
  }

  numberWithCommas(money: any): string {
    let parts = money.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
}
