import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { environment } from 'src/environments/environment';
import { _ } from 'underscore';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  userRole = localStorage.getItem('roles');
  loginId = localStorage.getItem('userId');

  form:FormGroup;
  leaveForm: FormGroup;
  page=1;
  perPage=20;
  totalRecord=0;
  productList: any[] = [];
  categoryList: any[]=[];
  subCategoryList: any[]=[];
  imageUrl = environment.imageUrl;
  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService) {
    this.getCategory();

    this.form = this.fb.group( {
      searchText: [''],
      category: [''],
      subCategory: [''],
      isListed: [''],
      isBestSeller: [''],
      pageNumber: ['1']
    })
    this.getProducts();
  }

  ngOnInit() {
  }

  getCategory() {
    this._serv.url="category/list";
    this._serv.get().subscribe(response => {
      this.categoryList = response as any[];
    })
  }

  getSubCategory(event) {
    this.subCategoryList=[];
    this.form.patchValue({subCategory:""});
    this._serv.url="sub-category/category/"+event.target.value;
    this._serv.get().subscribe(response => {
      this.subCategoryList = response as any[];
    })
  }

  getProducts(page=1) {
    this._serv.url = "product/list/paginate";
    this.form.get('pageNumber').setValue(page);
    this._serv.create(this.form.value).subscribe(response => {
      this.productList = response['data'] as any[];
      this.page=response["current_page"];
      this.totalRecord=parseInt(response['total']);
      this.perPage=response['per_page'];
    })
  }

  deleteProduct(item) {
    let cnfrm = confirm("Do you want to delete?");
    if(!cnfrm)return;
    this._serv.url="product";
    this._serv.delete(item.id).subscribe(response => {
      this.alert.success("Product deleted successfully.");
      this.getCategory();
    }, error => {
      this.alert.error(_.values(error.error.errors)[0][0]); 
    })
  }
}
