import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListReviewComponent } from './review/list-review/list-review.component';
import { UpdateReviewComponent } from './review/update-review/update-review.component';
import { ContactUsListComponent } from './contact-us/contact-us-list/contact-us-list.component';
import { UpdateContactUsComponent } from './contact-us/update-contact-us/update-contact-us.component';
import { ListEnquiryComponent } from './enquiry/list-enquiry/list-enquiry.component';
import { UpdateEnquiryComponent } from './enquiry/update-enquiry/update-enquiry.component';
import { ListOurTeamComponent } from './our-team/list-our-team/list-our-team.component';
import { UpdateOurTeamComponent } from './our-team/update-our-team/update-our-team.component';
import { ListCareerComponent } from './career/list-career/list-career.component';
import { UpdateCareerComponent } from './career/update-career/update-career.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'review',
        component: ListReviewComponent
      },{
        path: 'review-update',
        component: UpdateReviewComponent
      },{
        path: 'review-update/:id',
        component: UpdateReviewComponent
      }, {
        path: 'contact-us',
        component: ContactUsListComponent
      }, {
        path: 'contact-update',
        component: UpdateContactUsComponent
      }, {
        path: 'contact-update/:id',
        component: UpdateContactUsComponent
      }, {
        path: 'enquiry',
        component: ListEnquiryComponent
      }, {
        path: 'enquiry-update',
        component: UpdateEnquiryComponent
      }, {
        path: 'enquiry-update/:id',
        component: UpdateEnquiryComponent
      }, {
        path: 'our-team',
        component: ListOurTeamComponent
      }, {
        path: 'our-team-update',
        component: UpdateOurTeamComponent
      }, {
        path: 'our-team-update/:id',
        component: UpdateOurTeamComponent
      }, {
        path: 'career',
        component: ListCareerComponent
      }, {
        path: 'career-update',
        component: UpdateCareerComponent
      }, {
        path: 'career-update/:id',
        component: UpdateCareerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteManagerRoutingModule { }
