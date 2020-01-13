import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { SharedModule } from '../shared/shared.module';
import { ViewOrderComponent } from './view-order/view-order.component';
import { MakeCollectionComponent } from './make-collection/make-collection.component';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ],
  declarations: [AllOrdersComponent, ViewOrderComponent, MakeCollectionComponent]
})
export class OrderModule { }
