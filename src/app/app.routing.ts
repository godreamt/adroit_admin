import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './core';
import { AuthLayoutComponent } from './core';

export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'docs',
    loadChildren: './docs/docs.module#DocsModule'
  }]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  }, {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  }]
}, {
  path: '',
  component: AdminLayoutComponent,
  children: [{
    path: 'product',
    loadChildren: './product/product.module#ProductModule'
  },{
    path: 'site-manager',
    loadChildren: './site-manager/site-manager.module#SiteManagerModule'
  },{
    path: 'area-manager',
    loadChildren: './area/area.module#AreaModule'
  },{
    path: 'user-manager',
    loadChildren: './user/user.module#UserModule'
  },{
    path: 'order-manager',
    loadChildren: './order/order.module#OrderModule'
  },{
    path: 'collection-manager',
    loadChildren: './collection/collection.module#CollectionModule'
  },{
    path: 'expense-manager',
    loadChildren: './expense/expense.module#ExpenseModule'
  },  {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  }]
}, {
  path: '**',
  redirectTo: 'error/404'
}];