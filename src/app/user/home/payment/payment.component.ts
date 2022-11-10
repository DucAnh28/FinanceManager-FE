import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../model/category";
import {PaymentService} from "../../service/payment.service";
import {CategoryService} from "../../service/category.service";
import {AccountService} from "../../../account/service/account.service";
import {Payment} from "../../model/payment";
import {Wallet} from "../../model/wallet";
import {WalletService} from "../../service/wallet.service";


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm = new FormGroup({
    name: new FormControl(),
    date: new FormControl(),
    money: new FormControl(),
    category: new FormControl(),
    description: new FormControl(),

  })


  listCategory: Category[] =[];
  // color: string = '#E9E612';
  nameCategory: string = 'Danh mục giao dich';
  expenseCategories: Category[] = [];
  incomeCategories: Category[] = [];

  newCategory:Category = {
    // id: this.newCategoryId
  }
  public newCategoryId: any =1;


  constructor(
    private paymentService: PaymentService,
    private categoryService: CategoryService,
    private accountService: AccountService,
  ) {
    this.categoryService.findCateByUser(accountService.currentUserValue.id).subscribe(data => {
      this.listCategory = data;
      console.log("cTWA",this.listCategory);
    })




  }

  ngOnInit(): void {
    // this.showExpenseCategory();
    // this.showIncomeCategory();
  }

  // showExpenseCategory() {
  //   this.categoryService.findByStatus(2).subscribe((categories) => {
  //     console.log("cats",categories);
  //     this.expenseCategories = categories;
  //   }, e => {
  //     console.log(e);
  //   })
  // }
  //
  // showIncomeCategory() {
  //   this.categoryService.findByStatus(1).subscribe((categories) => {
  //     this.incomeCategories = categories;
  //   }, e => {
  //     console.log(e);
  //   })
  // }

  addPayment() {
    const data = this.paymentForm.value;
    console.log(data);
    console.log(data.category);
    if (data.date == null) {
      data.date = new Date();
      console.log(data.date);
    }
    data.category = {
      id: data.category
    };
    this.paymentService.save(data).subscribe(data => {
      console.log(data)
      alert('Thêm giao dịch thành công');
      this.paymentForm.reset();
    });
  }


    //
    // const newPayment:Payment = {
    //   name: this.paymentForm?.value.name,
    //   date: this.paymentForm?.value.date,
    //   money: this.paymentForm?.value.money,
    //   category: this.newCategory,
    //   description: this.paymentForm?.value.description
    // }
    // this.categoryService.findById(Number.parseInt(this.paymentForm.value.category)).subscribe(data => {
    //   this.paymentForm.value.category = data;
    // })
    // const payment = this.paymentForm.value
    // console.log(payment)
    // this.paymentService.save(newPayment).subscribe(data => {
    //   console.log(data);
    //   console.log("thanh cong")
    // })





}
