import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCollectionsComponent } from './all-collections/all-collections.component';
import { ViewCollectionComponent } from './view-collection/view-collection.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AllCollectionsComponent
      },
      {
        path: 'view/:id',
        component: ViewCollectionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule { }
