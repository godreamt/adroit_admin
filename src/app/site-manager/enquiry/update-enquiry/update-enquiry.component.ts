import { Component, OnInit } from '@angular/core';
import { _ } from 'underscore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-enquiry',
  templateUrl: './update-enquiry.component.html',
  styleUrls: ['./update-enquiry.component.scss']
})
export class UpdateEnquiryComponent implements OnInit {
  form: FormGroup;
  enquiryId: any;
  currentImage: any;

  constructor(private fb: FormBuilder, private alert: AlertService, private _serv: DataService, private router: Router, private route: ActivatedRoute) { 
    this.enquiryId = route.snapshot.params.id;
    if(this.enquiryId){
      this.getEnquiry();
    }
    this.form = this.fb.group({
      id: [''],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      customerInfo: [''],
      enquiryText: [''],
      status: ['']
    })
  }

  ngOnInit() {
  }

  getEnquiry() {
    this._serv.url = "site-manager/enquiry/"+this.enquiryId;
    this._serv.get().subscribe(response => {
      let data = response;
      this.form.patchValue(data);
    })
  }

  updateEnquiry(event) {
    event.preventDefault();
    this._serv.markFormGroupTouched(this.form);
    if(this.form.invalid)return;
    this._serv.url = "site-manager/enquiry";
    this._serv.create(this.form.value).subscribe(response => {
      this.alert.success(response[0]);
      this.router.navigate(['/site-manager/enquiry']);
    }, error => {
      this.alert.error(_.values(error.error.errors)[0][0]); 
    })
  }

}
