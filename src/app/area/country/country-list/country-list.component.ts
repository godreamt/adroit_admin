import { AlertService } from './../../../shared/services/alert.service';
import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  userRole = localStorage.getItem('roles');
  loginId = localStorage.getItem('userId');

  form:FormGroup;
  updateForm:FormGroup;
  page=1;
  perPage=20;
  totalRecord=0;
  countryList;
  imageUrl = environment.imageUrl;
  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService) {
    

    this.form = this.fb.group( {
      searchText: ['']
    })
    this.updateForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required]]
    })
    this.getCountries();
  }

  ngOnInit() {
  }

  getCountries() {
    let data = this.form.value;
    this._serv.url="countrys?searchText="+data.searchText;
    this._serv.get().subscribe(response => {
      this.countryList = response;
    })
  }

  editCountry(item) {
    this.updateForm.patchValue({id: item.id, title: item.country});
  }

  updateCountry(event) {
    event.preventDefault();
    this._serv.markFormGroupTouched(this.updateForm);
    if(this.updateForm.invalid)return;
    this._serv.url = "country";
    this._serv.create(this.updateForm.value).subscribe(response => {
      this.alert.showSuccess(response[0]);
      this.updateForm.reset();
      this.getCountries();
    }, error => {
      this.alert.showApiError(error);
    })
  }

  deleteCountry(item) {
    let cnfrm = confirm("Do you want to delete?");
    if(!cnfrm)return;
    this._serv.url="country";
    this._serv.delete(item.id).subscribe(response => {
      this.alert.success("Country deleted successfully.");
      this.getCountries();
    }, error => {
      this.alert.showApiError(error);
    })

  }
}
