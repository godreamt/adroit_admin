import { Component, OnInit } from '@angular/core';
import { _ } from 'underscore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  form: FormGroup;
  productId: any;
  currentImage: any;
  mainCategory: any[]=[];
  subCategoryList: any[]=[];

  constructor(private fb: FormBuilder, private alert: AlertService, private _serv: DataService, private router: Router, private route: ActivatedRoute) { 
    this.productId = this.route.snapshot.params.id;
    if(this.productId){
      this.getProduct();
    }
    this.form = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      sub_category_id: ['', [Validators.required]],
      offerPrice: ['0', [Validators.required]],
      regularPrice: ['0', [Validators.required]],
      salesPoints: ['0', [Validators.required]],
      removeFromList: ['no'],
      bestSeller: ['no'],
      shortDescription: [''],
      featureInfo: [''],
      description: [''],
      featuredImage: ['']
    })
    this.getMainCategory();
  }

  ngOnInit() {
  }

  getMainCategory() {
    this._serv.url="category/list";
    this._serv.get().subscribe(response => {
      this.mainCategory = response as any[];
    })
  }

  getSubCategory(event) {
    this.subCategoryList=[];
    this.form.patchValue({sub_category_id:""});
    this._serv.url="sub-category/category/"+event;
    this._serv.get().subscribe(response => {
      this.subCategoryList = response as any[];
    })
  }

  getProduct() {
    this._serv.url = "product/"+this.productId;
    this._serv.get().subscribe(response => {
      let data = response;
      this.currentImage = data['featuredImage'];
      // console.log(this.currentImage);
      this.getSubCategory(data['category_id']);
      data['featuredImage']="";
      this.form.patchValue(data);
    })
  }

  updateProduct(event) {
    event.preventDefault();
    this._serv.markFormGroupTouched(this.form);
    if(this.form.invalid)return;
    this._serv.url = "product";
    this._serv.create(this.form.value).subscribe(response => {
      this.alert.success(response[0]);
      this.router.navigate(['/product/list']);
    }, error => {
      this.alert.error(_.values(error.error.errors)[0][0]); 
    })
  }

}
