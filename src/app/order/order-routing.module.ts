import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { MakeCollectionComponent } from './make-collection/make-collection.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {path: "", component: AllOrdersComponent},
      {path: "view/:id", component: ViewOrderComponent},
      {path: "view/make-collection/:id", component: MakeCollectionComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
