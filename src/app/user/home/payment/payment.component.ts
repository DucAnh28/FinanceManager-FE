import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../model/category";
import {PaymentService} from "../../service/payment.service";
import {CategoryService} from "../../service/category.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm = new FormGroup({
    time: new FormControl(),
    totalSpent: new FormControl(),
    note: new FormControl(),
  })

  category: any;
  color: string = '#E9E612';
  nameCategory: string = 'Danh mục giao dich';
  expenseCategories: Category[] = [];
  incomeCategories: Category[] = [];
  payment: any;
  constructor(
    private paymentService: PaymentService,
    private categoryService: CategoryService,
    private toast: NgToastService
    // toast dung
  ) { }

  ngOnInit(): void {
    this.showExpenseCategory();
    this.showIncomeCategory();
  }
  showExpenseCategory() {
    this.categoryService.findByStatus(2).subscribe((categories) => {
      this.expenseCategories = categories;
    }, e => {
      console.log(e);
    })
  }

  showIncomeCategory() {
    this.categoryService.findByStatus(1).subscribe((categories) => {
      this.incomeCategories = categories;
    }, e => {
      console.log(e);
    })
  }

  addPayment() {
    this.payment = {
      category: {
        id: this.category.id,
      },
      time: this.paymentForm.value.time,
      totalSpent: this.paymentForm.value.totalSpent,
      note: this.paymentForm.value.note,
      wallet: {
        id: localStorage.getItem('ID_WALLET')
      }
    }
    console.log(this.payment);
    this.paymentService.save(this.payment).subscribe(() => {
      this.toast.success({detail: "Thông báo", summary: "Thêm giao dịch thành công!", duration: 3000, position: 'br'})
      setInterval(() => {
        location.reload()
      }, 600)
    })
  }


  getCategory(id: number) {
    this.categoryService.findById(id).subscribe(category => {
      this.category = category;
      this.nameCategory = category.name;
      this.color = category.color;
    })
  }

}
