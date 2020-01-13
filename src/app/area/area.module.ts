import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import { CountryListComponent } from './country/country-list/country-list.component';
import { CountryUpdateComponent } from './country/country-update/country-update.component';
import { StateUpdateComponent } from './state/state-update/state-update.component';
import { StateListComponent } from './state/state-list/state-list.component';
import { RegionListComponent } from './region/region-list/region-list.component';
import { RegionUpdateComponent } from './region/region-update/region-update.component';
import { AreaUpdateComponent } from './area/area-update/area-update.component';
import { AreaListComponent } from './area/area-list/area-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AreaRoutingModule
  ],
  declarations: [CountryListComponent, CountryUpdateComponent, StateUpdateComponent, StateListComponent, RegionListComponent, RegionUpdateComponent, AreaUpdateComponent, AreaListComponent]
})
export class AreaModule { }
