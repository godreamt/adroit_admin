import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  userRole = localStorage.getItem('roles');
  loginId = localStorage.getItem('userId');

  form:FormGroup;
  vendorList;
  orderList;
  userList;

  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService) {
    

    this.form = this.fb.group( {
      searchText: [''],
      orderStatus: ['new'],
      vendor_id: [''],
      sold_by: [''],
      pageNumber: ['1']
    })
    this.getPurchaseOrders();
    this.getUserList();
    this.getVendorList();
  }

  ngOnInit() {
  }

  getPurchaseOrders(page=1) {
    let data = this.form.value;
    data.pageNumber=page;
    this._serv.url="orders?searchText="+data.searchText+"&pageNumber="+data.pageNumber+"&orderStatus="+data.orderStatus+"&vendor_id="+data.vendor_id+"&sold_by="+data.sold_by;
    this._serv.get().subscribe(response => {
      this.orderList = response;
    })
  }

  deleteUser(item) {
    let cnfrm = confirm("Do you want to delete?");
    if(!cnfrm)return;
    this._serv.url="user";
    this._serv.delete(item.id).subscribe(response => {
      this.alert.success("User deleted successfully.");
      this.getPurchaseOrders();
    }, error => {
      this.alert.showApiError(error);
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
