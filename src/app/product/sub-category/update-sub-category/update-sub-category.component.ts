import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { _ } from 'underscore';

@Component({
  selector: 'app-update-sub-category',
  templateUrl: './update-sub-category.component.html',
  styleUrls: ['./update-sub-category.component.scss']
})
export class UpdateSubCategoryComponent implements OnInit {
  form: FormGroup;
  catId: any;
  currentImage: any;
  mainCategory: any[]=[];

  constructor(private fb: FormBuilder, private alert: AlertService, private _serv: DataService, private router: Router, private route: ActivatedRoute) { 
    this.catId = this.route.snapshot.params.id;
    if(this.catId){
      this.getSubCategory();
    }
    this.form = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      shortDescription: [''],
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

  getSubCategory() {
    this._serv.url = "sub-category/"+this.catId;
    this._serv.get().subscribe(response => {
      let data = response;
      this.currentImage = data['featuredImage'];
      console.log(this.currentImage);
      
      data['featuredImage']="";
      this.form.patchValue(data);
    })
  }

  updateCategory(event) {
    event.preventDefault();
    this._serv.markFormGroupTouched(this.form);
    if(this.form.invalid)return;
    this._serv.url = "sub-category";
    this._serv.create(this.form.value).subscribe(response => {
      this.alert.success(response[0]);
      this.router.navigate(['/product/sub-category-list']);
    }, error => {
      this.alert.error(_.values(error.error.errors)[0][0]); 
    })
  }

}
