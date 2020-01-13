import { Component, OnInit } from '@angular/core';
import { _ } from 'underscore';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-list-enquiry',
  templateUrl: './list-enquiry.component.html',
  styleUrls: ['./list-enquiry.component.scss']
})
export class ListEnquiryComponent implements OnInit {
  userRole = localStorage.getItem('roles');
  loginId = localStorage.getItem('userId');

  form:FormGroup;
  page=1;
  perPage=20;
  totalRecord=0;
  enquiryList: any[]=[];
  imageUrl = environment.imageUrl;
  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService) {
    

    this.form = this.fb.group( {
      searchText: [''],
      pageNumber: ['1']
    })
    this.getSiteEnquiry();
  }

  ngOnInit() {
  }


  getSiteEnquiry(page=1) {
    this._serv.url="site-manager/enquiry?pageNumber="+page;
    // let data = this.form.value;
    // data.pageNumber=page;
    this._serv.get().subscribe(response => {
      this.enquiryList = response['data'] as any[];
      this.page=response["current_page"];
      this.totalRecord=parseInt(response['total']);
      this.perPage=response['per_page'];
    })
  }

  deleteEnquiry(item) {
    let cnfrm = confirm("Do you want to delete?");
    if(!cnfrm)return;
    this._serv.url="site-manager/enquiry";
    this._serv.delete(item.id).subscribe(response => {
      this.alert.success("Enquiry deleted successfully.");
      this.getSiteEnquiry();
    }, error => {
      this.alert.error(_.values(error.error.errors)[0][0]); 
    })

  }
}
