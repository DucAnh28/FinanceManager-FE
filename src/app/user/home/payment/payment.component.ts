import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../model/category";
import {PaymentService} from "../../service/payment.service";
import {CategoryService} from "../../service/category.service";
import {AccountService} from "../../../account/service/account.service";
import {Payment} from "../../model/payment";
import {WalletService} from "../../service/wallet.service";
import Swal from "sweetalert2";
import {Wallet} from "../../model/wallet";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    date: new FormControl(),
    money: new FormControl(),
    category: new FormControl(),
    description: new FormControl(),
    status: new FormControl(1),
    wallet: new FormControl(),
  })


  listCategory: Category[] = [];
  nameCategory: string = 'Danh mục giao dich';
  expenseCategories: Category[] = [];
  incomeCategories: Category[] = [];
  listWallet: Wallet[] = [];
  wallet_id: number = 0;

  constructor(
    private paymentService: PaymentService,
    private categoryService: CategoryService,
    private walletService: WalletService,
  ) {
    this.categoryService.findAll().subscribe(data => {
      this.listCategory = data;
      console.log("cTWA", this.listCategory);
    })
    this.walletService.getAll().subscribe(data => {
      this.listWallet = data;
      console.log("wallet", this.listWallet);
      this.wallet_id = this.listWallet[0].id;
      console.log("wallet_id", this.wallet_id);
      this.getPaymentList();
    })

  }

  ngOnInit(): void {
  }

  getWalletid(id: any) {
    this.wallet_id  = id;
    console.log(this.wallet_id);
  }

  getAllByWallet() {
  }

  addPayment() {

    const data = this.paymentForm.value;
    console.log(data);
    console.log(data.category);
    if (data.date == null) {
      Swal.fire('Fail', 'Please do not blank', 'error');

      data.date = new Date();
      console.log(data.date);
    }
    data.category = {
      id: data.category
    };

    data.wallet = {
      id: this.wallet_id
    }
    this.paymentService.save(data).subscribe(data => {
      Swal.fire('Sucess',
        'Please choose date',
        'success');
      console.log(data)
      this.paymentForm.reset();
      this.getPaymentList();
    });
  }

  paymentList: Payment[] = [];

  getPaymentList() {
    this.paymentService.findAllByWallet(this.wallet_id).subscribe(data => {
      this.paymentList = data;
      console.log("paymentList", this.paymentList);

    })


  }


  deletePayment(id: number) {
    Swal.fire({
      title: 'Are You Sure?',
      text: "You Won't Be Able To Revert This!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No Keep It',
      confirmButtonText: 'Yes, Delete It!',
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.paymentService.delete(id).subscribe(data => {
            this.getPaymentList();
          }, e => {
            console.log(e);
          });
          Swal.fire(
            'Deleted!',
            'Your Payment Has Been Deleted.',
            'success'
          )
        }
      })


  }


  // Update payment
  updatePayment(id: number) {
    this.paymentService.findById(id).subscribe(payment => {
      this.paymentForm = new FormGroup({
        id: new FormControl(payment.id),
        name: new FormControl(payment.name),
        date: new FormControl(payment.date),
        money: new FormControl(payment.money),
        category: new FormControl(payment.category),
        description: new FormControl(payment.description),
        status: new FormControl(payment.status),
        wallet: new FormControl(payment.wallet),
      })
    })

  }

  updatePaymentSubmit() {
    const data = this.paymentForm.value;
    console.log(data.category);
    if (data.date == null) {
      data.date = new Date();
      console.log(data.date);
    }
    data.category = {
      id: data.category
    };
    this.paymentService.update(data.id, data).subscribe(data => {
      console.log(data)
      Swal.fire('Success',
        'You Update Your Wallet Successful',
        'success');
      this.paymentForm.reset();
      this.getPaymentList();

    });
  }


}










