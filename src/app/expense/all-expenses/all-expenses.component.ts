import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.scss']
})
export class AllExpensesComponent implements OnInit {
  userRole = localStorage.getItem('roles');
  loginId = localStorage.getItem('userId');

  form:FormGroup
  expenseList;
  userList;
  monthList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  yearList = ['2017', '2018', '2019', '2020', '2021'];

  constructor(private _serv: DataService, private fb: FormBuilder, private route: ActivatedRoute, private alert: AlertService) {
    

    this.form = this.fb.group( {
      searchText: [''],
      approvedStatus: ['requested'],
      user_id: [''],
      month: [''],
      year: [''],
      pageNumber: ['1']
    })
    this.getExpenses();
    this.getUserList();
  }

  ngOnInit() {
  }

  getExpenses(page=1) {
    let data = this.form.value;
    data.pageNumber=page;
    this._serv.url="expenses?searchText="+data.searchText+"&pageNumber="+data.pageNumber+"&approvedStatus="+data.approvedStatus+"&user_id="+data.user_id+"&month="+data.month+"&year="+data.year;
    this._serv.get().subscribe(response => {
      this.expenseList = response;
    })
  }

  getUserList() {
    this._serv.url="users/no-pagination";
    this._serv.get().subscribe(response => {
      this.userList = response;
    })
  }

}
