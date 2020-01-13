import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProductComponent } from './product/list-product/list-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { ListSubCategoryComponent } from './sub-category/list-sub-category/list-sub-category.component';
import { UpdateSubCategoryComponent } from './sub-category/update-sub-category/update-sub-category.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListProductComponent
      },
      {
        path: 'update',
        component: UpdateProductComponent
      },
      {
        path: 'update/:id',
        component: UpdateProductComponent
      },
      {
        path: 'category-list',
        component: ListCategoryComponent
      },
      {
        path: 'category-update',
        component: UpdateCategoryComponent
      },
      {
        path: 'category-update/:id',
        component: UpdateCategoryComponent
      },
      {
        path: 'sub-category-list',
        component: ListSubCategoryComponent
      },
      {
        path: 'sub-category-update',
        component: UpdateSubCategoryComponent
      },
      {
        path: 'sub-category-update/:id',
        component: UpdateSubCategoryComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
