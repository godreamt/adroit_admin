import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteManagerRoutingModule } from './site-manager-routing.module';
import { ListReviewComponent } from './review/list-review/list-review.component';
import { UpdateReviewComponent } from './review/update-review/update-review.component';
import { ListEnquiryComponent } from './enquiry/list-enquiry/list-enquiry.component';
import { ContactUsListComponent } from './contact-us/contact-us-list/contact-us-list.component';
import { UpdateEnquiryComponent } from './enquiry/update-enquiry/update-enquiry.component';
import { UpdateContactUsComponent } from './contact-us/update-contact-us/update-contact-us.component';
import { SharedModule } from '../shared/shared.module';
import { UpdateOurTeamComponent } from './our-team/update-our-team/update-our-team.component';
import { ListOurTeamComponent } from './our-team/list-our-team/list-our-team.component';
import { ListCareerComponent } from './career/list-career/list-career.component';
import { UpdateCareerComponent } from './career/update-career/update-career.component';

@NgModule({
  imports: [
    CommonModule,
    SiteManagerRoutingModule,
    SharedModule
  ],
  declarations: [ListReviewComponent, UpdateReviewComponent, ListEnquiryComponent, ContactUsListComponent, UpdateEnquiryComponent, UpdateContactUsComponent, UpdateOurTeamComponent, ListOurTeamComponent, ListCareerComponent, UpdateCareerComponent]
})
export class SiteManagerModule { }
