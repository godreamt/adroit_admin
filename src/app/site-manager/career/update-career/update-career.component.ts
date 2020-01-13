import { Component, OnInit } from '@angular/core';
import { _ } from 'underscore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-career',
  templateUrl: './update-career.component.html',
  styleUrls: ['./update-career.component.scss']
})
export class UpdateCareerComponent implements OnInit {
  form: FormGroup;
  careerId: any;
  currentImage: any;

  constructor(private fb: FormBuilder, private alert: AlertService, private _serv: DataService, private router: Router, private route: ActivatedRoute) { 
    this.careerId = route.snapshot.params.id;
    if(this.careerId){
      this.getCareer();
    }
    this.form = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      info: ['', [Validators.required]],
      description: ['']
    })
  }

  ngOnInit() {
  }

  getCareer() {
    this._serv.url = "site-manager/career/"+this.careerId;
    this._serv.get().subscribe(response => {
      let data = response;
      this.form.patchValue(data);
    })
  }

  updateContactRequest(event) {
    event.preventDefault();
    this._serv.markFormGroupTouched(this.form);
    if(this.form.invalid)return;
    this._serv.url = "site-manager/career";
    this._serv.create(this.form.value).subscribe(response => {
      this.alert.success(response[0]);
      this.router.navigate(['/site-manager/career']);
    }, error => {
      this.alert.error(_.values(error.error.errors)[0][0]); 
    })
  }

}
