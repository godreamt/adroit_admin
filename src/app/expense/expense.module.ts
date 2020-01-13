import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { AllExpensesComponent } from './all-expenses/all-expenses.component';
import { ViewExpensesComponent } from './view-expenses/view-expenses.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    SharedModule
  ],
  declarations: [AllExpensesComponent, ViewExpensesComponent]
})
export class ExpenseModule { }
