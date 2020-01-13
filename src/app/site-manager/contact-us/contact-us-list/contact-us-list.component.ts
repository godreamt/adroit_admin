import { Component, OnInit } from '@angular/core';
import { _ } from 'underscore';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-contact-us-list',
  templateUrl: './contact-us-list.component.html',
  styleUrls: ['./contact-us-list.component.scss']
})
export class ContactUsListComponent implements OnInit {
  userRole = localStorage.getItem('roles');
  loginId = localStorage.getItem('userId');

  form:FormGroup;
  page=1;
  perPage=20;
  totalRecord=0;
  contactList: any[]=[];
  imageUrl = environment.imageUrl;
  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService) {
    

    this.form = this.fb.group( {
      searchText: [''],
      pageNumber: ['1']
    })
    this.getContactRequest();
  }

  ngOnInit() {
  }


  getContactRequest(page=1) {
    this._serv.url="site-manager/contact?pageNumber="+page;
    // let data = this.form.value;
    // data.pageNumber=page;
    this._serv.get().subscribe(response => {
      this.contactList = response['data'] as any[];
      this.page=response["current_page"];
      this.totalRecord=parseInt(response['total']);
      this.perPage=response['per_page'];
    })
  }

  deleteReview(item) {
    let cnfrm = confirm("Do you want to delete?");
    if(!cnfrm)return;
    this._serv.url="site-manager/contact";
    this._serv.delete(item.id).subscribe(response => {
      this.alert.success("Review deleted successfully.");
      this.getContactRequest();
    }, error => {
      this.alert.error(_.values(error.error.errors)[0][0]); 
    })

  }
}
