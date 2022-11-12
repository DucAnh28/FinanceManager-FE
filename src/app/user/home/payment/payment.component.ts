import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../model/category";
import {PaymentService} from "../../service/payment.service";
import {CategoryService} from "../../service/category.service";
import {AccountService} from "../../../account/service/account.service";
import {Payment} from "../../model/payment";
import {get} from "@angular/fire/database";
// import {SweetAlertService} from '../../service/sweetAlert/sweet-alert.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup<{ date: FormControl<any>; money: FormControl<any>; name: FormControl<any>; description: FormControl<any>; category: FormControl<any>; status: FormControl<number | null> }> = new FormGroup({
    name: new FormControl(),
    date: new FormControl(),
    money: new FormControl(),
    category: new FormControl(),
    description: new FormControl(),
    status: new FormControl(1),
  })


  listCategory: Category[] = [];
  // color: string = '#E9E612';
  nameCategory: string = 'Danh mục giao dich';
  expenseCategories: Category[] = [];
  incomeCategories: Category[] = [];

  newCategory: Category = {
    // id: this.newCategoryId
  }
  public newCategoryId: any = 1;


  constructor(
    private paymentService: PaymentService,
    private categoryService: CategoryService,
    private accountService: AccountService,
    // private sweetAlertService: SweetAlertService,
  ) {
    this.categoryService.findCateByUser(accountService.currentUserValue.id).subscribe(data => {
      this.listCategory = data;
      console.log("cTWA", this.listCategory);
    })


  }

  ngOnInit(): void {
    this.getPaymentList();

  }


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
      this.getPaymentList();
    });
  }

  paymentList: Payment[] = [];

  getPaymentList() {
    this.paymentService.findAll().subscribe(data => {
      this.paymentList = data;
      console.log("paymentList", this.paymentList);

    })


  }

  deletePayment(id: number) {
    this.paymentService.delete(id).subscribe(data => {
      console.log(data);
      this.getPaymentList();

    })

  }
  // Update payment
  updatePaymentForm : FormGroup;
  updatePayment(id: number) {
    this.paymentService.findById(id).subscribe(data => {
      this.updatePaymentForm = new FormGroup({
        id: new FormControl(data.id),
        name: new FormControl(data.name),
        date: new FormControl(data.date),
        money: new FormControl(data.money),
        category: new FormControl(data.category),
        description: new FormControl(data.description),
        status: new FormControl(data.status),
      })
    })

  }
  updatePaymentSubmit() {
    const data = this.updatePaymentForm.value;
    console.log(data);
    // console.log(data.category);
    // if (data.date == null) {
    //   data.date = new Date();
    //   console.log(data.date);
    // }
    // data.category = {
    //   id: data.category
    // };
    this.paymentService.update(data.id, data).subscribe(data => {
      console.log(data)
      alert('Cập nhật giao dịch thành công');
      this.updatePaymentForm.reset();
      this.getPaymentList();
    });
  }



}










