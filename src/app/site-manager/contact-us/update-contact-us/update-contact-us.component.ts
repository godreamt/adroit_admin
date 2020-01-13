import { Component, OnInit } from '@angular/core';
import { _ } from 'underscore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-contact-us',
  templateUrl: './update-contact-us.component.html',
  styleUrls: ['./update-contact-us.component.scss']
})
export class UpdateContactUsComponent implements OnInit {
  form: FormGroup;
  enquiryId: any;
  currentImage: any;

  constructor(private fb: FormBuilder, private alert: AlertService, private _serv: DataService, private router: Router, private route: ActivatedRoute) { 
    this.enquiryId = route.snapshot.params.id;
    if(this.enquiryId){
      this.getContact();
    }
    this.form = this.fb.group({
      id: [''],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      reasonText: [''],
      status: ['']
    })
  }

  ngOnInit() {
  }

  getContact() {
    this._serv.url = "site-manager/contact/"+this.enquiryId;
    this._serv.get().subscribe(response => {
      let data = response;
      this.form.patchValue(data);
    })
  }

  updateContactRequest(event) {
    event.preventDefault();
    this._serv.markFormGroupTouched(this.form);
    if(this.form.invalid)return;
    this._serv.url = "site-manager/contact";
    this._serv.create(this.form.value).subscribe(response => {
      this.alert.success(response[0]);
      this.router.navigate(['/site-manager/contact-us']);
    }, error => {
      this.alert.error(_.values(error.error.errors)[0][0]); 
    })
  }

}
