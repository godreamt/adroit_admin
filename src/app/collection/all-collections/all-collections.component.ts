import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-all-collections',
  templateUrl: './all-collections.component.html',
  styleUrls: ['./all-collections.component.scss']
})
export class AllCollectionsComponent implements OnInit {
  userRole = localStorage.getItem('roles');
  loginId = localStorage.getItem('userId');

  form:FormGroup
  vendorList;
  collectionList;
  userList;

  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService) {
    

    this.form = this.fb.group( {
      searchText: [''],
      paymentStatus: ['pending'],
      vendor_id: [''],
      collect_by: [''],
      pageNumber: ['1']
    })
    this.getCollectionOrders();
    this.getUserList();
    this.getVendorList();
  }

  ngOnInit() {
  }

  getCollectionOrders(page=1) {
    let data = this.form.value;
    data.pageNumber=page;
    this._serv.url="collections?searchText="+data.searchText+"&pageNumber="+data.pageNumber+"&paymentStatus="+data.paymentStatus+"&vendor_id="+data.vendor_id+"&collect_by="+data.collect_by;
    this._serv.get().subscribe(response => {
      this.collectionList = response;
    })
  }

  getVendorList() {
    this._serv.url="active-vendor-list";
    this._serv.get().subscribe(response => {
      this.vendorList = response;
    })
  }

  getUserList() {
    this._serv.url="users/no-pagination";
    this._serv.get().subscribe(response => {
      this.userList = response;
    })
  }

}
