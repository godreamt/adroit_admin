import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { ListSubCategoryComponent } from './sub-category/list-sub-category/list-sub-category.component';
import { UpdateSubCategoryComponent } from './sub-category/update-sub-category/update-sub-category.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ],
  declarations: [UpdateCategoryComponent, ListCategoryComponent, ListSubCategoryComponent, UpdateSubCategoryComponent, ListProductComponent, UpdateProductComponent]
})
export class ProductModule { }
