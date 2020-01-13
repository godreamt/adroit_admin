import { AlertService } from './../../shared/services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../shared/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-target',
  templateUrl: './monthly-target.component.html',
  styleUrls: ['./monthly-target.component.scss']
})
export class MonthlyTargetComponent implements OnInit {
  userRole = localStorage.getItem('roles');
  loginId = localStorage.getItem('userId');

  form:FormGroup;
  updateForm:FormGroup;
  page=1;
  perPage=20;
  totalRecord=0;
  monthlyTargetList;
  imageUrl = environment.imageUrl;
  monthList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  yearList = ['2017', '2018', '2019', '2020', '2021'];
  user_id;
  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService) {
    this.user_id = this.route.snapshot.params.id;

    this.form = this.fb.group( {
      month: [''],
      year: ['']
    })
    this.updateForm = this.fb.group({
      id: [''],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
      salesTarget: ['00'],
      collectionTarget: ['', [Validators.required]],
      user_id: [this.user_id]
    })
    this.getMontlyTarget();
  }

  ngOnInit() {
  }

  getMontlyTarget(page=1) {
    let data = this.form.value;
    this._serv.url="monthly-targets?month="+data.month+"&year="+data.year+"&pageNumber="+page;
    this._serv.get().subscribe(response => {
      this.monthlyTargetList = response;
    })
  }

  editMonthlyTarget(item) {
    this.updateForm.patchValue({id: item.id, month: item.month, year: item.year, salesTarget: item.salesTarget, collectionTarget: item.collectionTarget, user_id: item.user_id});
  }

  updateTarget(event) {
    event.preventDefault();
    this._serv.markFormGroupTouched(this.updateForm);
    if(this.updateForm.invalid)return;
    this._serv.url = "monthly-target";
    let data = this.updateForm.value;
    data.user_id = this.user_id;
    data.salesTarget = "10000";
    this._serv.create(data).subscribe(response => {
      this.alert.showSuccess(response[0]);
      this.updateForm.reset();
      this.updateForm.get('user_id').setValue(this.user_id);
      this.getMontlyTarget();
    }, error => {
      this.alert.showApiError(error);
    })
  }

  deleteTarget(item) {
    let cnfrm = confirm("Do you want to delete?");
    if(!cnfrm)return;
    this._serv.url="monthly-target";
    this._serv.delete(item.id).subscribe(response => {
      this.alert.success("Target deleted successfully.");
      this.getMontlyTarget();
    }, error => {
      this.alert.showApiError(error);
    })

  }
}
