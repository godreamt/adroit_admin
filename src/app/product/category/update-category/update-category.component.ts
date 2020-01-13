import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DataService } from 'src/app/shared/services/data.service';
import { _ } from 'underscore';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {
  form: FormGroup;
  catId: any;
  currentImage: any;

  constructor(private fb: FormBuilder, private alert: AlertService, private _serv: DataService, private router: Router, private route: ActivatedRoute) { 
    this.catId = route.snapshot.params.id;
    if(this.catId){
      this.getCategory();
    }
    this.form = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      shortDescription: [''],
      description: [''],
      featuredImage: ['']
    })
  }

  ngOnInit() {
  }

  getCategory() {
    this._serv.url = "category/"+this.catId;
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
    this._serv.url = "category";
    this._serv.create(this.form.value).subscribe(response => {
      this.alert.success(response[0]);
      this.router.navigate(['/product/category-list']);
    }, error => {
      this.alert.error(_.values(error.error.errors)[0][0]); 
    })
  }

}
