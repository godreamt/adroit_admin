import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllExpensesComponent } from './all-expenses/all-expenses.component';
import { ViewExpensesComponent } from './view-expenses/view-expenses.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AllExpensesComponent
      },
      {
        path: 'view/:id',
        component: ViewExpensesComponent
      }
    ]
  }
];;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
