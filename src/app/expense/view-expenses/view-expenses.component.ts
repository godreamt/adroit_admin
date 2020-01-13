import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TouchSequence } from 'selenium-webdriver';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-expenses',
  templateUrl: './view-expenses.component.html',
  styleUrls: ['./view-expenses.component.scss']
})
export class ViewExpensesComponent implements OnInit {
  userRole = localStorage.getItem('roles');
  loginId = localStorage.getItem('userId');
  expenseId;
  expenseData;
  userData;
  imgUrl=environment.imageUrl;
  approvalForm:FormGroup;
  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService, private router: Router) {
    this.expenseId = this.route.snapshot.params.id;
    this.getExpenseDetails();
    this.approvalForm = this.fb.group({
      allocatedAmount: ['', Validators.required]
    })
  }
  ngOnInit() {
  }

  getExpenseDetails() {
    this._serv.url="expense/"+this.expenseId;
    this._serv.get().subscribe(response => {
      this.expenseData = response;
      this.getUserDetails()
    })
  }

  getUserDetails() {
    this._serv.url="user/"+this.expenseData.user_id;
    this._serv.get().subscribe(response => {
      this.userData = response;
    })
  }

  processExpense() {
    this._serv.markFormGroupTouched(this.approvalForm);
    if(this.approvalForm.invalid)return;
    let cnfrm = confirm("Are you sure want to approve?");
    if(!cnfrm)return;
    this._serv.url = "expense/update-status";
    this._serv.create({id: this.expenseData.id, status: 'approved', allocatedAmount: this.approvalForm.get('allocatedAmount').value}).subscribe(response => {
      this.alert.showSuccess(response[0]);
      this.getExpenseDetails();
    }, error =>{
      this.alert.showApiError(error);
    })
  }

  cancelExpense() {
    let cnfrm = confirm("Are you sure want to cancel?");
    if(!cnfrm)return;
    this._serv.url = "expense/update-status";
    this._serv.create({id: this.expenseData.id, status: 'cancelled'}).subscribe(response => {
      this.alert.showSuccess(response[0]);
      this.getExpenseDetails();
    }, error =>{
      this.alert.showApiError(error);
    })
  }
}
