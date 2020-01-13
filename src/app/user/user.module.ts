import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { MonthlyTargetComponent } from './monthly-target/monthly-target.component';
import { NewPurchaseComponent } from './vendor/new-purchase/new-purchase.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  declarations: [UserListComponent, UserUpdateComponent, MonthlyTargetComponent, NewPurchaseComponent]
})
export class UserModule { }
