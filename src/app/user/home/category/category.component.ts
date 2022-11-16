import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../service/category.service";
import {Category} from "../../model/category";
import {AccountService} from "../../../account/service/account.service";
import {AppUser} from "../../model/appUser";
import {FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryList: Category[];
  deleteID: number;
  appUser: AppUser;
  createForm: FormGroup;

  constructor(private categoryService: CategoryService,
              private accountService: AccountService) {
    accountService.getUserById().subscribe(data => {
      this.appUser = data;
      console.log(data);
      this.createForm = new FormGroup({
        id: new FormControl(),
        name: new FormControl(),
        status: new FormControl(1),
        appUser: new FormControl(data),
      })
    })
  }

  createCategory() {
    const temp = this.createForm.value;
    this.categoryService.save(temp).subscribe(data => {
      console.log(data);
      this.getAllCate();
      Swal.fire("Successful", "Create OK", "success")
    })
  }

  ngOnInit(): void {
    this.getAllCate();
  }

  getAllCate() {
    this.categoryService.findAll().subscribe(data => {
      this.categoryList = data;
    })
  }

  getDeleteCateId(id: number) {
    this.deleteID = id;
  }

  deleteCategory(id: number) {
    this.categoryService.delete(id).subscribe(data => {
      if (data == null) {
        Swal.fire("Warning", "You can't delete this default category", "warning")
      } else {
        Swal.fire("Succes", "Delete Successful", "success");
        this.getAllCate();
      }
    })
  }
}
