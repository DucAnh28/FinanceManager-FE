import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Category} from "../user/model/category";
import {PaymentService} from "../user/service/paymentservice";

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
    // private categoryService: CategoryService,
    // private toast: NgToastService
  ) { }

  ngOnInit(): void {
  }

  getCategory(id: number) {
    this.categoryService.findById(id).subscribe(category => {
      this.category = category;
      this.nameCategory = category.name;
      this.color = category.color;
    })
  }

}
