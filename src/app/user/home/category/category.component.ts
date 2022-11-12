import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../service/category.service";
import {Category} from "../../model/category";
import Swal from "sweetalert2";
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryList: Category[];
  deleteID : number;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getAllCate();
  }

  getAllCate() {
    this.categoryService.findAll().subscribe(data => {
      this.categoryList = data;
    })
  }

  getDeleteCateId(id :number){
    this.deleteID = id;
  }

  deleteCategory(id:number){
    this.categoryService.delete(id).subscribe(data=>{
      Swal.fire("Succes","Delete Successful","success");
      this.getAllCate();
    })
  }
}
