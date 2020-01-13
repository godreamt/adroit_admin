import { AlertService } from './../../../shared/services/alert.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent implements OnInit {
  userRole = localStorage.getItem('roles');
  loginId = localStorage.getItem('userId');

  form:FormGroup;
  updateForm:FormGroup;
  page=1;
  perPage=20;
  totalRecord=0;
  countryList;
  stateList;
  filterStateList;
  regionList;
  filterRegionList;
  areaList;
  imageUrl = environment.imageUrl;
  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService) {
    

    this.form = this.fb.group( {
      searchText: [''],
      country_id: [''],
      state_id: [''],
      region_id: [''],
    })
    this.updateForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      state_id: ['', [Validators.required]],
      region_id: ['', [Validators.required]],
    })
    this.getCountries();
    this.getArea();
  }

  ngOnInit() {
  }

  getCountries() {
    this._serv.url="countrys";
    this._serv.get().subscribe(response => {
      this.countryList = response;
    })
  }

  getStates() {
    let data = this.updateForm.value;
    this._serv.url = "states?country_id="+data.country_id;
    this._serv.get().subscribe(response => {
      this.stateList = response;
    })
  }

  getRegions() {
    let data = this.updateForm.value;
    this._serv.url = "regions?country_id="+data.country_id+"&state_id="+data.state_id;
    this._serv.get().subscribe(response => {
      this.regionList = response;
    })
  }

  getStatesFilter() {
    let data = this.form.value;
    this._serv.url = "states?country_id="+data.country_id;
    this._serv.get().subscribe(response => {
      this.filterStateList = response;
    })
  }
 
  getRegionsFilter() {
    let data = this.form.value;
    this._serv.url = "regions?country_id="+data.country_id+"&state_id="+data.state_id;
    this._serv.get().subscribe(response => {
      this.filterRegionList = response;
    })
  }

  getArea() {
    let data = this.form.value;
    this._serv.url = "areas?searchText="+data.searchText+"&country_id="+data.country_id+"&state_id="+data.state_id+"&region_id="+data.region_id;
    this._serv.get().subscribe(response => {
      this.areaList = response;
    })
  }

  editArea(item) {
    this.updateForm.patchValue({id: item.id, title: item.area, country_id: item.country_id, state_id: item.state_id, region_id: item.region_id});
    this.getStates();
    this.getRegions();
  }

  updateArea(event) {
    event.preventDefault();
    this._serv.markFormGroupTouched(this.updateForm);
    if(this.updateForm.invalid)return;
    this._serv.url = "area";
    this._serv.create(this.updateForm.value).subscribe(response => {
      this.alert.showSuccess(response[0]);
      this.updateForm.reset();
      this.stateList=[];
      this.regionList=[];
      this.getArea();
    }, error => {
      this.alert.showApiError(error);
    })
  }

  deleteArea(item) {
    let cnfrm = confirm("Do you want to delete?");
    if(!cnfrm)return;
    this._serv.url="area";
    this._serv.delete(item.id).subscribe(response => {
      this.alert.success("Area deleted successfully.");
      this.getArea();
    }, error => {
      this.alert.showApiError(error);
    })

  }
}
