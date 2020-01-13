import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  userRole = localStorage.getItem('roles');
  loginId = localStorage.getItem('userId');
  order_id;
  orderData;
  vendorData;
  soldUserData;

  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService, private router: Router) {
    this.order_id = this.route.snapshot.params.id;
    this.getOrderDetails();
  }
  ngOnInit() {
  }

  getOrderDetails() {
    this._serv.url="order/"+this.order_id;
    this._serv.get().subscribe(response => {
      this.orderData = response;
      this.getVendorDetails()
      this.getSoldUserDetails();
    })
  }

  getVendorDetails() {
    this._serv.url="user/"+this.orderData.vendor_id;
    this._serv.get().subscribe(response => {
      this.vendorData = response;
    })
  }

  getSoldUserDetails() {
    this._serv.url="user/"+this.orderData.sold_by;
    this._serv.get().subscribe(response => {
      this.soldUserData = response;
    })
  }

  approveOrder() {
    let cnfrm = confirm("Are you sure want to approve?");
    if(!cnfrm)return;
    this._serv.url = "order/update-status";
    this._serv.create({id: this.orderData.id, status: 'approved'}).subscribe(response => {
      this.alert.showSuccess(response[0]);
      this.getOrderDetails();
    }, error =>{
      this.alert.showApiError(error);
    })
  }

  rejectOrder() {
    let cnfrm = confirm("Are you sure want to cancel?");
    if(!cnfrm)return;
    this._serv.url = "order/update-status";
    this._serv.create({id: this.orderData.id, status: 'cancelled'}).subscribe(response => {
      this.alert.showSuccess(response[0]);
      this.getOrderDetails();
    }, error =>{
      this.alert.showApiError(error);
    })
  }

  deliverOrder() {
    let cnfrm = confirm("Are you sure want to set as delivered?");
    if(!cnfrm)return;
    this._serv.url = "order/update-status";
    this._serv.create({id: this.orderData.id, status: 'delivered'}).subscribe(response => {
      this.alert.showSuccess(response[0]);
      this.getOrderDetails();
    }, error =>{
      this.alert.showApiError(error);
    })
  }
}
