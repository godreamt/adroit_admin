import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.scss']
})
export class NewPurchaseComponent implements OnInit {
  userRole = localStorage.getItem('roles');
  loginId = localStorage.getItem('userId');

  form:FormGroup;
  imageUrl = environment.imageUrl;
  user_id;
  userData;
  categoryList: any[];
  subCategoryList: any[] = [];
  productList: any[] = [];
  totalOrderPrice=0;
  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService, private router: Router) {
    this.user_id = this.route.snapshot.params.id;

    this.route.data.subscribe(response => {
        this.userData = response['user'];
    })

    this.form = this.fb.group( {
      vendor_id: [''],
      comments: [''],
      items: this.fb.array([this.addItem()])
    })
  }
  ngOnInit() {
    this.getCategory();
  }

  addItem() {
    return this.fb.group({
      category_id: [''],
      sub_category_id: [''],
      product_id: ['', [Validators.required]],
      price: ['0'],
      total: ['0'],
      quantity: ['0', Validators.required]
    })
  }

  get items() {
    return this.form.get('items') as FormArray;
  }

  addProduct() {
    this.items.push(this.addItem())
  }

  getCategory() {
    this._serv.url="category/list";
    this._serv.get().subscribe(response => {
      this.categoryList = response as any[];
    })
  }

  getSubCategory(event, i) {
    this.subCategoryList[i]=[];
    this.form.patchValue({sub_category_id:""});
    this._serv.url="sub-category/category/"+event.target.value;
    this._serv.get().subscribe(response => {
      this.subCategoryList[i] = response as any[];
    })
  }

  getProducts(event, i) {
    this.productList[i]=[];
    this._serv.url = "product/list?subCategory="+event.target.value;
    this._serv.get().subscribe(response => {
      this.productList[i] = response as any[];
    })
  }

  getProductDetail(event, i) {
    let product;
    let product_id = event.target.value;
    if(product_id) {
      this.productList[i].forEach(elem => {
        if(elem.id == product_id) {
          product = elem;
          return;
        }
      })
    }
    
    this.items.controls[i].get('price').setValue(product.regularPrice);
    this.calculateTotalPrice(i);
  }

  calculateTotalPrice(i) {
    let value = {...this.items.controls[i].value};
    value.quantity = (isNaN(parseInt(value.quantity)))?0:parseInt(value.quantity);
    value.price = (isNaN(parseFloat(value.price)))?0:parseFloat(value.price);
    this.items.controls[i].get('total').setValue((value.quantity * value.price).toString());
    this.getTotalOrderPrice();
  }

  removeProduct(i){
    this.items.removeAt(i);
  }

  getTotalOrderPrice() {
    let value = this.items.value;
    this.totalOrderPrice=0;
    value.forEach(elem => {
      this.totalOrderPrice += parseFloat(elem.total);
    })
  }

  makeOrder() {
    this._serv.url="order";
    let data = this.form.value;
    data.vendor_id = this.user_id;
    this._serv.create(data).subscribe(response => {
      this.alert.showSuccess(response[0]);
      this.router.navigateByUrl('/order-manager/list');
    }, error => {
      this.alert.showApiError(error);
    })
  }
}
