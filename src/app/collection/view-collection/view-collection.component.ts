import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.scss']
})
export class ViewCollectionComponent implements OnInit {
  userRole = localStorage.getItem('roles');
  loginId = localStorage.getItem('userId');
  collectionId;
  collectionData;
  vendorData;
  collectedUserData;
  orderDetails;

  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService, private router: Router) {
    this.collectionId = this.route.snapshot.params.id;
    this.getCollectionDetails();
  }
  ngOnInit() {
  }

  getCollectionDetails() {
    this._serv.url="collection/"+this.collectionId;
    this._serv.get().subscribe(response => {
      this.collectionData = response;
      this.getVendorDetails()
      this.getCollectionUserData();
      this.getOrderDetails();
    })
  }

  getOrderDetails() {
    this._serv.url="order/"+this.collectionData.order_id;
    this._serv.get().subscribe(response => {
      this.orderDetails = response;
    })
  }

  getVendorDetails() {
    this._serv.url="user/"+this.collectionData.vendor_id;
    this._serv.get().subscribe(response => {
      this.vendorData = response;
    })
  }

  getCollectionUserData() {
    this._serv.url="user/"+this.collectionData.collect_by;
    this._serv.get().subscribe(response => {
      this.collectedUserData = response;
    })
  }

  processCollection() {
    let cnfrm = confirm("Are you sure want to approve?");
    if(!cnfrm)return;
    this._serv.url = "collection/update-status";
    this._serv.create({id: this.collectionData.id, status: 'processed'}).subscribe(response => {
      this.alert.showSuccess(response[0]);
      this.getCollectionDetails();
    }, error =>{
      this.alert.showApiError(error);
    })
  }

  cancelCollection() {
    let cnfrm = confirm("Are you sure want to cancel?");
    if(!cnfrm)return;
    this._serv.url = "collection/update-status";
    this._serv.create({id: this.collectionData.id, status: 'cancelled'}).subscribe(response => {
      this.alert.showSuccess(response[0]);
      this.getCollectionDetails();
    }, error =>{
      this.alert.showApiError(error);
    })
  }
}
