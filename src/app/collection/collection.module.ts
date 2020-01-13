import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionRoutingModule } from './collection-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AllCollectionsComponent } from './all-collections/all-collections.component';
import { ViewCollectionComponent } from './view-collection/view-collection.component';

@NgModule({
  imports: [
    CommonModule,
    CollectionRoutingModule,
    SharedModule
  ],
  declarations: [AllCollectionsComponent, ViewCollectionComponent]
})
export class CollectionModule { }
