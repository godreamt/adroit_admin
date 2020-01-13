import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { _ } from 'underscore';

@Component({
  selector: 'app-list-sub-category',
  templateUrl: './list-sub-category.component.html',
  styleUrls: ['./list-sub-category.component.scss']
})
export class ListSubCategoryComponent implements OnInit {
  userRole = localStorage.getItem('roles');
  loginId = localStorage.getItem('userId');

  form:FormGroup;
  page=1;
  perPage=20;
  totalRecord=0;
  categoryList: any[]=[];
  imageUrl = environment.imageUrl;
  mainCategory:any[] = [];
  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService) {
    

    this.form = this.fb.group( {
      searchText: [''],
      category_id: [''],
      pageNumber: ['1']
    })
    this.getCategory();
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

  getCategory(page=1) {
    this._serv.url="sub-category/list/paginate";
    let data = this.form.value;
    data.pageNumber=page;
    this._serv.create(data).subscribe(response => {
      this.categoryList = response['data'] as any[];
      this.page=response["current_page"];
      this.totalRecord=parseInt(response['total']);
      this.perPage=response['per_page'];
    })
  }

  deleteCategory(item) {
    let cnfrm = confirm("Do you want to delete?");
    if(!cnfrm)return;
    this._serv.url="sub-category";
    this._serv.delete(item.id).subscribe(response => {
      this.alert.success("Category deleted successfully.");
      this.getCategory();
    }, error => {
      this.alert.error(_.values(error.error.errors)[0][0]); 
    })

  }
}
