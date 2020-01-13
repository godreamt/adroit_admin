import { AlertService } from './../../../shared/services/alert.service';
import { environment } from './../../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {
  userRole = localStorage.getItem('roles');
  loginId = localStorage.getItem('userId');

  form:FormGroup;
  updateForm:FormGroup;
  page=1;
  perPage=20;
  totalRecord=0;
  countryList;
  stateList;
  imageUrl = environment.imageUrl;
  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService) {
    

    this.form = this.fb.group( {
      searchText: [''],
      country_id: ['']
    })
    this.updateForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      country_id: ['', [Validators.required]]
    })
    this.getCountries();
    this.getStates();
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
    let data = this.form.value;
    this._serv.url = "states?searchText="+data.searchText+"&country_id="+data.country_id;
    this._serv.get().subscribe(response => {
      this.stateList = response;
    })
  }

  editState(item) {
    this.updateForm.patchValue({id: item.id, title: item.state, country_id: item.country_id});
  }

  updateState(event) {
    event.preventDefault();
    this._serv.markFormGroupTouched(this.updateForm);
    if(this.updateForm.invalid)return;
    this._serv.url = "state";
    this._serv.create(this.updateForm.value).subscribe(response => {
      this.alert.showSuccess(response[0]);
      this.updateForm.reset();
      this.getStates();
    }, error => {
      this.alert.showApiError(error);
    })
  }

  deleteState(item) {
    let cnfrm = confirm("Do you want to delete?");
    if(!cnfrm)return;
    this._serv.url="state";
    this._serv.delete(item.id).subscribe(response => {
      this.alert.success("State deleted successfully.");
      this.getStates();
    }, error => {
      this.alert.showApiError(error);
    })

  }
}
