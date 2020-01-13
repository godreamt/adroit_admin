import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserResolver } from './user-update/user-resolver';
import { MonthlyTargetComponent } from './monthly-target/monthly-target.component';
import { NewPurchaseComponent } from './vendor/new-purchase/new-purchase.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {path: "list", component: UserListComponent},
      {path: "update", component: UserUpdateComponent},
      {path: "update/:id", component: UserUpdateComponent, resolve: {'user': UserResolver}},
      {path: "monthly-target/:id", component: MonthlyTargetComponent, resolve: {'user': UserResolver}},
      {path: "new-purchase/:id", component: NewPurchaseComponent, resolve: {'user': UserResolver}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
