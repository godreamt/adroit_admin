import { AreaListComponent } from './area/area-list/area-list.component';
import { CountryListComponent } from './country/country-list/country-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateListComponent } from './state/state-list/state-list.component';
import { RegionListComponent } from './region/region-list/region-list.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: 'country-list',
        component: CountryListComponent
      },{
        path: 'state-list',
        component: StateListComponent
      },{
        path: 'region-list',
        component: RegionListComponent
      },{
        path: 'area-list',
        component: AreaListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaRoutingModule { }
