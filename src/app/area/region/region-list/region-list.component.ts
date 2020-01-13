import { AlertService } from './../../../shared/services/alert.service';
import { environment } from './../../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss']
})
export class RegionListComponent implements OnInit {
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
  imageUrl = environment.imageUrl;
  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService) {
    

    this.form = this.fb.group( {
      searchText: [''],
      country_id: [''],
      state_id: [''],
    })
    this.updateForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      state_id: ['', [Validators.required]],
    })
    this.getCountries();
    this.getRegions();
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
    this._serv.url = "states?&country_id="+data.country_id;
    this._serv.get().subscribe(response => {
      this.stateList = response;
    })
  }

  getStatesFilter() {
    let data = this.form.value;
    this._serv.url = "states?&country_id="+data.country_id;
    this._serv.get().subscribe(response => {
      this.filterStateList = response;
    })
  }

  getRegions() {
    let data = this.form.value;
    this._serv.url = "regions?searchText="+data.searchText+"&country_id="+data.country_id+"&state_id="+data.state_id;
    this._serv.get().subscribe(response => {
      this.regionList = response;
    })
  }

  editRegion(item) {
    this.updateForm.patchValue({id: item.id, title: item.region, country_id: item.country_id, state_id: item.state_id});
    this.getStates();
  }

  updateRegion(event) {
    event.preventDefault();
    this._serv.markFormGroupTouched(this.updateForm);
    if(this.updateForm.invalid)return;
    this._serv.url = "region";
    this._serv.create(this.updateForm.value).subscribe(response => {
      this.alert.showSuccess(response[0]);
      this.updateForm.reset();
      this.stateList=[];
      this.getRegions();
    }, error => {
      this.alert.showApiError(error);
    })
  }

  deleteRegion(item) {
    let cnfrm = confirm("Do you want to delete?");
    if(!cnfrm)return;
    this._serv.url="region";
    this._serv.delete(item.id).subscribe(response => {
      this.alert.success("Region deleted successfully.");
      this.getRegions();
    }, error => {
      this.alert.showApiError(error);
    })

  }
}
