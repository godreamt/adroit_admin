import { AlertService } from './../../shared/services/alert.service';
import { environment } from './../../../environments/environment.prod';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userRole = localStorage.getItem('roles');
  loginId = localStorage.getItem('userId');

  form:FormGroup;
  imageUrl = environment.imageUrl;
  userList;
  countryList;
  stateList;
  regionList;
  areaList;

  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService) {
    

    this.form = this.fb.group( {
      searchText: [''],
      roles: [''],
      country_id: [''],
      state_id: [''],
      region_id: [''],
      area_id: [''],
      pageNumber: ['1']
    })
    this.getUserList();
  }

  ngOnInit() {
    this.getCountries();
  }

  getUserList(page=1) {
    let data = this.form.value;
    data.pageNumber=page;
    this._serv.url="users?searchText="+data.searchText+"&pageNumber="+data.pageNumber+"&roles="+data.roles+"&country_id="+data.country_id+"&state_id="+data.state_id+"&region_id="+data.region_id+"&area_id="+data.area_id;
    this._serv.get().subscribe(response => {
      this.userList = response;
    })
  }

  deleteUser(item) {
    let cnfrm = confirm("Do you want to delete?");
    if(!cnfrm)return;
    this._serv.url="user";
    this._serv.delete(item.id).subscribe(response => {
      this.alert.success("User deleted successfully.");
      this.getUserList();
    }, error => {
      this.alert.showApiError(error);
    })

  }

  getCountries() {
    this._serv.url="countrys";
    this._serv.get().subscribe(response => {
      this.countryList = response;
    })
  }

  getStates() {
    let data = this.form.value;
    this._serv.url = "states?country_id="+data.country_id;
    this._serv.get().subscribe(response => {
      this.stateList = response;
    })
  }

  getRegions() {
    let data = this.form.value;
    this._serv.url = "regions?country_id="+data.country_id+"&state_id="+data.state_id;
    this._serv.get().subscribe(response => {
      this.regionList = response;
    })
  }


  getArea() {
    let data = this.form.value;
    this._serv.url = "areas?country_id="+data.country_id+"&state_id="+data.state_id+"&region_id="+data.region_id;
    this._serv.get().subscribe(response => {
      this.areaList = response;
    })
  }
}
